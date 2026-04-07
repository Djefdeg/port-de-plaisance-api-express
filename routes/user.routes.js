const express = require('express');
const router = express.Router();

const userController = require('../controllers/API/user.Controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: eric
 *               email:
 *                 type: string
 *                 example: eric@email.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */

//Appel de la fonction du controller qui crée un nouvel utilisateur
router.post('/', userController.createUser);

//Route d'authentification du nom d'utilisateur et mot de passe
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *       401:
 *         description: Non authentifié / Token invalide
 */

//Appel de la fonction du controller qui affiche la liste des utilisateurs
router.get('/', auth, userController.getAllUsers);

//Appel de la fonction du controller qui modifie un utilisateur donné par son email
router.patch('/:email', auth, userController.updateGivenUser);

/**
 * @swagger
 * /api/users/email:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: email de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
//Appel de la fonction du controller qui supprime un utilisateur donné par son email
router.delete('/:email', auth, userController.deleteGivenUser);

//Route de déconnexion de l'utilisateur
router.get('/logout', userController.logout);

//Route Dynamiques

//Appel de la fonction du controller qui affiche un utilisateur donné par son email
router.get('/:email', auth, userController.getGivenUser);

module.exports = router;