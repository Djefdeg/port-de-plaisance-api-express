const express = require('express');
const router = express.Router();
//const auth = require('../middlewares/auth.middleware');

const homeController = require ('../controllers/pages/home.Controller');
const dashboardController = require ('../controllers/pages/dashboard.Controller');

//Route de la page home pour logger
router.get('/', homeController.home);

//Route vers la page tableau de bord
router.get('/dashboard', dashboardController.dashboard);



module.exports = router;