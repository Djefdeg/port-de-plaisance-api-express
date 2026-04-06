const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

// Importation des routes
const indexRoutes = require('./routes/index.routes');
const catwayRoutes = require('./routes/catway.routes');
const reservationRoutes = require('./routes/reservation.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cors());
app.use(express.json());

// 🔥 SESSION ICI
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// routes API
app.use('/api/catways', catwayRoutes);
app.use('/api/catways', reservationRoutes);
//app.use('/api/reservations', reservationRoutes);
app.use('/api/users',userRoutes);
//Routes pages EJS
app.use('/', indexRoutes);

module.exports = app;

