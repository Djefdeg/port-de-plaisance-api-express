const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importation des routes
const indexRoutes = require('./routes/index.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'))

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/catways', catwayRoutes);
app.use('/catways', reservationRoutes);
app.use('/users',userRoutes);
app.use('/', indexRoutes);

module.exports = app;

