const express = require('express');
const cors = require('cors');          
// Importation des routes
const indexRoutes = require('./routes/index.routes');
const mongoose = require('mongoose');
const catwayRoutes = require ('./routes/catway.routes')

const app = express();
// ⚡ Activer CORS pour toutes les origines (simple)
app.use(cors());

app.use('/',indexRoutes);

// lire le body JSON des requêtes
app.use(express.json());

// Appel de catwayRoutes
app.use('/catways',catwayRoutes);

module.exports = app;