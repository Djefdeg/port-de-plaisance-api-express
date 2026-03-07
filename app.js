const express = require('express');
const app = express();


// Importation des routes
const indexRoutes = require('./routes/index.routes');

app.use('/',indexRoutes);


module.exports = app;