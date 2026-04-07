const express =require('express');
const router = express.Router();

const catwayController = require ('../controllers/API/catway.Controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Récupérer tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Liste des catways
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   catwayNumber:
 *                     type: number
 *                   catwayType:
 *                     type: string
 *                   catwayState:
 *                     type: string
 *       401:
 *         description: Non authentifié / Token invalide
 */

//Appel de la fonction du controller qui affiche la liste des catway
router.get('/', auth, catwayController.getAllCatways);

//Appel de la fonction du controller qui affiche un catway donné
router.get('/:catwayNumber', auth, catwayController.getGivenCatway);

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
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
 *               catwayType:
 *                 type: string
 *                 example: Long
 *               catwayState:
 *                 type: string
 *                 example: état bon
 *     responses:
 *       201:
 *         description: catway créé
 *       400:
 *         description: Données invalides
 */
//Appel de la fonction du controller qui ajoute un catway
router.post('/', auth, catwayController.createCatway);

//Appel de la fonction du controller qui modifie un catway donné
router.patch('/:catwayNumber', auth, catwayController.updateGivenCatway);

/**
 * @swagger
 * /api/catways/catwayNumber:
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 */
//Appel de la fonction du controller qui suprime un catway donné
router.delete('/:catwayNumber', auth, catwayController.deleteGivenCatway);


module.exports = router;