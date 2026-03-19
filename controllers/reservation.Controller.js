const Catway = require('../models/catway.model');
const Reservation = require ('../models/reservation.model');

//Afficher la liste des réservations (tous catways confondus)) : GET /catways/all
exports.getAllReservationsGlobal = async(req,res) =>{
     try{
          const reservations = await Reservation.find();
          return res.status(200).json(reservations);
     }catch(error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};

//Afficher la liste des réservations avec catwayNumber donné : GET /catways/:catwayNumber/reservations
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

//récupérer une réservation précise : GET /catways/:catwayNumber/reservations/:reservationId
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

//Créer une nouvelle réservation : POST /catways/:catwayNumber/reservations
exports.createReservation = async(req,res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.catwayNumber),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const catwayNumber=Number(req.params.catwayNumber);
          const catway = await Catway.findOne({catwayNumber:catwayNumber});
          if (!catway){
               return res.status(404).json({message:'catway_not_found'});
          }
          if (!req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) {
               return res.status(400).json({ message: 'Missing required fields' });
          }  
          if (new Date(req.body.startDate) >= new Date(req.body.endDate)) {
               return res.status(400).json({ message: 'endDate must be after startDate' });
          }
          const newReservation = await Reservation.create(reservationBuffer);
          return res.status(201).json(newReservation);
     }catch (error){
          console.error(error);
          return res.status(500).json({ message: 'internal_server_error' });
     }
};

//Modifier les champs d'une réservation donnée : PUT /catways/:catwayNumber/reservations/:reservationId
exports.updateGivenReservation = async (req, res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.catwayNumber),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const catwayNumber=Number(req.params.catwayNumber);
          const reservationId = req.params.reservationId;
           if (!req.body.clientName || !req.body.boatName || !req.body.startDate || !req.body.endDate) {
                return res.status(400).json({ message: 'Missing required fields' });
          }  
          const reservation = await Reservation.findOne({catwayNumber:catwayNumber, _id:reservationId});
          if (!reservation){
               return res.status(404).json({message: 'reservation_not_found'});
          }
          if (new Date(req.body.startDate) >= new Date(req.body.endDate)) {
               return res.status(400).json({ message: 'endDate must be after startDate' });
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

//Supprimer une réservation donnée : DELETE /catways/:catwayNumber/reservations/:reservationId
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