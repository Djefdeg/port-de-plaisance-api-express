const express = require('express');
const router = express.Router();
const authSession = require('../middlewares/authSession.middleware');

const homeController = require ('../controllers/pages/home.Controller');
const dashboardController = require ('../controllers/pages/dashboard.Controller');
const catwayController = require('../controllers/pages/catway.controller');
const reservationController = require('../controllers/pages/reservation.controller');
const userController = require('../controllers/pages/user.controller');


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

//routes de reservation
router.get('/reservations', authSession, reservationController.getAllReservations);

router.post('/reservations', authSession, reservationController.handleReservation);

//routes de user
router.get('/users', authSession, userController.getAllUsers);

router.post('/users', authSession, userController.handleUser);

module.exports = router;