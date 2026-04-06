const Catway = require('../../models/catway.model');
const Reservation = require ('../../models/reservation.model');

/**
 * Afficher la liste des réservations (tous catways confondus)) : GET /catways/all
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllReservationsGlobal = async(req,res) =>{
     try{
          const reservations = await Reservation.find();
          return res.status(200).json(reservations);
     }catch(error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};

/**
 * Afficher la liste des réservations en cours (tous catways confondus)) : GET /reservations/current
 * Ce controller ne fonctionne pas car son filtre de dates ne fonctionne pas
 * @param {Object} req
 * @param {Object} res
 */
exports.getCurrentReservations = async (req, res) => {
    try {
        const today = new Date();
       //Le filtre réalisé ici ne fonctionne pas et pourtant aucune erreur n'est apparente
        const reservations = await Reservation.find({
            startDate: { $lte: today }, 
            endDate: { $gte: today }
        });

        res.json(reservations);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Afficher la liste des réservations avec catwayNumber donné : GET /catways/:catwayNumber/reservations
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllReservations = async (req, res)=>{
   try {
        const catwayNumber=Number(req.params.catwayNumber);
        
        const catway = await Catway.findOne({ catwayNumber });
        if (!catway) {
          return res.status(404).json({ message: 'catway_not_found' });
}
        const reservations = await Reservation.find({catwayNumber:catwayNumber}).sort({ startDate: 1 });
        return res.status(200).json(reservations);
   }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
   }
};

/**
 * récupérer une réservation précise : GET /catways/:catwayNumber/reservations/:reservationId
 * @param {Object} req
 * @param {Object} res
 */
exports.getGivenReservation = async(req,res)=>{
     try {
          const catwayNumber=Number(req.params.catwayNumber);
          const reservationId = req.params.reservationId;
          const reservation = await Reservation.findOne({catwayNumber:catwayNumber, _id:reservationId});
          if (!reservation) {
               return res.status(404).json({ message: 'reservation_not_found'});
          }
          return res.status(200).json(reservation);
     }catch (error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};

/**
 * Créer une nouvelle réservation : POST /catways/:catwayNumber/reservations
 * @param {Object} req
 * @param {Object} res
 */
exports.createReservation = async(req,res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.catwayNumber),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const start = new Date(req.body.startDate);
          const end = new Date(req.body.endDate);
          const catwayNumber=Number(req.params.catwayNumber);
          const catway = await Catway.findOne({catwayNumber:catwayNumber});
          if (!catway){
               return res.status(404).json({message:'catway_not_found'});
          }
          if (!req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) {
               return res.status(400).json({ message: 'Missing required fields' });
          }  
          if (isNaN(start) || isNaN(end)) {
               return res.status(400).json({ message: 'Invalid dates' });
          }
          if (start >= end) {
               return res.status(400).json({ message: 'endDate must be after startDate' });
          }
          // Vérifier chevauchement
          const overlappingReservation = await Reservation.findOne({
               catwayNumber: catwayNumber,
               startDate: { $lt: end }, // $lt: less than
               endDate: { $gt: start }  // $gt: greater than
               });

          if (overlappingReservation) {
               return res.status(400).json({
               message: 'This catway is already reserved for the selected dates'
               });
          }
          const newReservation = await Reservation.create(reservationBuffer);
          return res.status(201).json(newReservation);
     }catch (error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};

/**
 * Modifier les champs d'une réservation donnée : PUT /catways/:catwayNumber/reservations/:reservationId
 * @param {Object} req
 * @param {Object} res
 */
exports.updateGivenReservation = async (req, res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.catwayNumber),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const start = new Date(req.body.startDate);
          const end = new Date(req.body.endDate);
          const catwayNumber=Number(req.params.catwayNumber);
          const reservationId = req.params.reservationId;
          if (!req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) {
               return res.status(400).json({ message: 'Missing required fields' });
          }  
          if (isNaN(start) || isNaN(end)) {
               return res.status(400).json({ message: 'Invalid dates' });
          }
          if (start >= end) {
               return res.status(400).json({ message: 'endDate must be after startDate' });
          }
          const reservation = await Reservation.findOne({catwayNumber:catwayNumber, _id:reservationId});
          if (!reservation){
               return res.status(404).json({message: 'reservation_not_found'});
          }
          // Vérifier chevauchement
          const overlappingReservation = await Reservation.findOne({
               catwayNumber: catwayNumber,
               _id: { $ne: req.params.reservationId }, //eviter la reservation qu'on est entrain de modifier
               startDate: { $lt: end }, // $lt: less than
               endDate: { $gt: start }  // $gt: greater than
               });

          if (overlappingReservation) {
               return res.status(400).json({
               message: 'This catway is already reserved for the selected dates'
               });
          }
          let modifiedReservation = await Reservation.findByIdAndUpdate(
               reservationId,
               reservationBuffer,
               {new:true, runValidators: true}
               );
          return res.status (200).json(modifiedReservation);
     }catch(error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }     
};

/**
 * Supprimer une réservation donnée : DELETE /catways/:catwayNumber/reservations/:reservationId
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteGivenReservation = async (req,res) =>{
     try {
          const catwayNumber=Number(req.params.catwayNumber);
          const reservationId = req.params.reservationId;
          const deletedReservation = await Reservation.findOneAndDelete({catwayNumber:catwayNumber, _id:reservationId});
          if(!deletedReservation){
               return res.status(404).json({ message: 'reservation_not_found'});
          }
          return res.status(200).json({message:'reservation-deleted'});
     }catch (error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};