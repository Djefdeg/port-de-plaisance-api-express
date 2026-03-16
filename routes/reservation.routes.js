const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.Controller');

//Afficher toutes les réservations (tous catways confondus)
router.get('/reservations/all', reservationController.getAllReservationsGlobal);

//Appel de la fonction du controller qui affiche une réservation donnée d'un catway donné
router.get('/:catwayNumber/reservations/:reservationId',reservationController.getGivenReservation);

//Appel de la fonction du controller qui affiche la liste des réservation d'un catway donné
router.get('/:catwayNumber/reservations',reservationController.getAllReservations);

//Appel de la fonction du controller qui ajoute une réservation donnée d'un catway donné
router.post('/:catwayNumber/reservations',reservationController.createReservation);

//Appel de la fonction du controller qui modifie une réservation donnée d'un catway donné
router.put('/:catwayNumber/reservations/:reservationId',reservationController.updateGivenReservation);

//Appel de la fonction du controller qui supprime une réservation donnée d'un catway donné
router.delete('/:catwayNumber/reservations/:reservationId',reservationController.deleteGivenReservation);

module.exports = router;