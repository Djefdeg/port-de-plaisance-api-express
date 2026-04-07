const express = require('express');
const router = express.Router();

const reservationController = require('../controllers/API/reservation.Controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/catways/reservations:
 *   get:
 *     summary: Récupérer toutes les reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Liste des reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: number
 *                   clientName:
 *                     type: string
 *                   boatName:
 *                     type: string
 *                   firstdate:
 *                     type: date
 *                   enddate:
 *                     type: date
 *       401:
 *         description: Non authentifié / Token invalide
 */

//Afficher toutes les réservations (tous catways confondus)
router.get('/reservations/all', auth, reservationController.getAllReservationsGlobal);

//Afficher toutes les réservations en cours(tous catways confondus)
router.get('/reservations/current', auth, reservationController.getCurrentReservations);

//Appel de la fonction du controller qui affiche une réservation donnée d'un catway donné
router.get('/:catwayNumber/reservations/:reservationId', auth, reservationController.getGivenReservation);

//Appel de la fonction du controller qui affiche la liste des réservation d'un catway donné
router.get('/:catwayNumber/reservations', auth, reservationController.getAllReservations);

/**
 * @swagger
 * /api/catways/catwayNumber/reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 example: 5
 *               clientName:
 *                 type: string
 *                 example: Dupont
 *               boatName:
 *                 type: string
 *                 example: MonBateau
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Données invalides
 */

//Appel de la fonction du controller qui ajoute une réservation donnée d'un catway donné
router.post('/:catwayNumber/reservations', auth, reservationController.createReservation);

//Appel de la fonction du controller qui modifie une réservation donnée d'un catway donné
router.put('/:catwayNumber/reservations/:reservationId', auth, reservationController.updateGivenReservation);

/**
 * @swagger
 * /api/catways/catwayNumber/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 */

//Appel de la fonction du controller qui supprime une réservation donnée d'un catway donné
router.delete('/:catwayNumber/reservations/:reservationId', auth, reservationController.deleteGivenReservation);

module.exports = router;