const express = require('express');
const router = express.Router();
const authSession = require('../middlewares/authSession.middleware');

const homeController = require ('../controllers/pages/home.Controller');
const dashboardController = require ('../controllers/pages/dashboard.Controller');
const catwayController = require('../controllers/pages/catway.controller');


//Route de la page home pour logger
router.get('/', homeController.home);

//Route de connexion dans la page home
router.post('/login', homeController.login);

//Route vers la page tableau de bord
router.get('/dashboard',authSession, dashboardController.dashboard);

// Route de déconnexion
router.get('/logout', homeController.logout);

//routes de catway
router.get('/catways', authSession, catwayController.getAllCatways);

router.post('/catways', authSession, catwayController.handleCatway);



module.exports = router;