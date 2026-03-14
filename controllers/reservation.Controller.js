const Catway = require('../models/catway.model');
const Reservation = require ('../models/reservation.model');

//Afficher la liste des réservations avec id donné : GET /catways/:id/reservations
exports.getAllReservations = async (req, res)=>{
   try {
        const id = Number(req.params.id);
        const reservations = await Reservation.find({catwayNumber:id});
        if (reservations.length === 0) {
            return res.status(404).json('reservations_not_found');
              }  
        return res.status(200).json(reservations);
   }catch (error){
        return res.status(500).json(error);
   }
};

//récupérer une réservation précise : GET /catways/:id/reservations/:reservationId
exports.getReservationById = async(req,res)=>{
     try {
          const id = Number(req.params.id);
          const reservationId = req.params.reservationId;
          const reservation = await Reservation.findOne({catwayNumber:id, _id:reservationId});
          if (!reservation) {
               return res.status(404).json('reservation_not_found');
          }
          return res.status(200).json(reservation);
     }catch (error){
          return res.status(500).json(error);
     }
};

//Créer une nouvelle réservation : POST /catways/:id/reservations
exports.createReservation = async(req,res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.id),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const id= req.params.id;
          const catway = await Catway.findById(id);
          if (!catway){
               return res.status(404).json('catway_not_found');
          }
          const newReservation = await Reservation.create(reservationBuffer);
          return res.status(201).json(newReservation);
     }catch (error){
          return res.status(500).json(error);
     }
};

//Modifier les champs d'une réservation donnée : PUT /catways/:id/reservations/:reservationId
exports.updateReservation = async (req, res)=>{
     const reservationBuffer = {
          catwayNumber: Number(req.params.id),
          clientName : req.body.clientName,
          boatName:req.body.boatName,
          startDate:req.body.startDate,
          endDate:req.body.endDate
     };
     try {
          const id = Number(req.params.id);
          const reservationId = req.params.reservationId;
          const reservation = await Reservation.findOne({catwayNumber:id, _id:reservationId});
          if (!reservation){
               return res.status(404).json('reservation_not_found');
          }
          let modifiedReservation = await Reservation.findByIdAndUpdate(
               reservationId,
               reservationBuffer,
               {new:true}
               );
          return res.status (200).json(modifiedReservation);
     }catch(error){
          return res.status(500).json(error);
     }     
};

//Supprimer une réservation donnée : DELETE /catways/:id/reservations/:reservationId
exports.deleteReservation = async (req,res) =>{
     try {
          const catwayId = Number (req.params.id);
          const reservationId = req.params.reservationId;
          const deletedReservation = await Reservation.findOneAndDelete({catwayNumber:catwayId, _id:reservationId});
          if(!deletedReservation){
               return res.status(404).json('reservation_not_found');
          }
          return res.status(200).json('reservation-deleted');
     }catch (error){
          return res.status(500).json(error);
     }
};