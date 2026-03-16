const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importation des routes
const indexRoutes = require('./routes/index.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/', indexRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways', reservationRoutes);

module.exports = app;

