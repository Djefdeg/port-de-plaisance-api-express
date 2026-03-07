const mongoose = require('mongoose');

//Schéma pour une réservation

const reservationSchema = new mongoose.Schema({
    catwayNumber: {type : Number, required: true, min: 0 },
    clientName : {type: String, required: true},
    boatName:{type: String, required: true},
    startDate:{type: Date, required: true},
    endDate:{type: Date, required: true}
},
{
    timestamps : true}
);

module.exports = mongoose.model('Reservation',reservationSchema);