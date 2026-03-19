const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.Controller');

//Appel de la fonction du controller qui affiche la liste des utilisateurs
router.get('/',userController.getAllUsers);

//Appel de la fonction du controller qui affiche un utilisateur donné par son email
router.get('/:email',userController.getGivenUser);

//Appel de la fonction du controller qui crée un nouvel utilisateur
router.post('/',userController.createUser);

//Appel de la fonction du controller qui modifie un utilisateur donné par son email
router.patch('/:email',userController.updateGivenUser);

//Appel de la fonction du controller qui supprime un utilisateur donné par son email
router.delete('/:email',userController.deleteGivenUser);

module.exports = router;