const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/API/reservation.Controller');
const auth = require('../middlewares/auth.middleware');

//Afficher toutes les réservations (tous catways confondus)
router.get('/reservations/all', auth, reservationController.getAllReservationsGlobal);

//Afficher toutes les réservations en cours(tous catways confondus)
router.get('/reservations/current', auth, reservationController.getCurrentReservations);

//Appel de la fonction du controller qui affiche une réservation donnée d'un catway donné
router.get('/:catwayNumber/reservations/:reservationId', auth, reservationController.getGivenReservation);

//Appel de la fonction du controller qui affiche la liste des réservation d'un catway donné
router.get('/:catwayNumber/reservations', auth, reservationController.getAllReservations);

//Appel de la fonction du controller qui ajoute une réservation donnée d'un catway donné
router.post('/:catwayNumber/reservations', auth, reservationController.createReservation);

//Appel de la fonction du controller qui modifie une réservation donnée d'un catway donné
router.put('/:catwayNumber/reservations/:reservationId', auth, reservationController.updateGivenReservation);

//Appel de la fonction du controller qui supprime une réservation donnée d'un catway donné
router.delete('/:catwayNumber/reservations/:reservationId', auth, reservationController.deleteGivenReservation);

module.exports = router;