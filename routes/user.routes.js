const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.Controller');
const auth = require('../middlewares/auth.middleware');

//Routes publiques

//Appel de la fonction du controller qui crée un nouvel utilisateur
router.post('/', userController.createUser);

//Route d'authentification du nom d'utilisateur et mot de passe
router.post('/login', userController.login);

//Routes Protégées

//Appel de la fonction du controller qui affiche la liste des utilisateurs
router.get('/', auth, userController.getAllUsers);

//Appel de la fonction du controller qui modifie un utilisateur donné par son email
router.patch('/:email', auth, userController.updateGivenUser);

//Appel de la fonction du controller qui supprime un utilisateur donné par son email
router.delete('/:email', auth, userController.deleteGivenUser);

//Route de déconnexion de l'utilisateur
router.get('/logout', userController.logout);

//Route Dynamiques

//Appel de la fonction du controller qui affiche un utilisateur donné par son email
router.get('/:email', auth, userController.getGivenUser);

module.exports = router;