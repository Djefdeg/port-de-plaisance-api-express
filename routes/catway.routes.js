const express =require('express');
const router = express.Router();

const catwayController = require ('../controllers/API/catway.Controller');
const auth = require('../middlewares/auth.middleware');

//Appel de la fonction du controller qui affiche la liste des catway
router.get('/', auth, catwayController.getAllCatways);

//Appel de la fonction du controller qui affiche un catway donné
router.get('/:catwayNumber', auth, catwayController.getGivenCatway);

//Appel de la fonction du controller qui ajoute un catway
router.post('/', auth, catwayController.createCatway);

//Appel de la fonction du controller qui modifie un catway donné
router.patch('/:catwayNumber', auth, catwayController.updateGivenCatway);

//Appel de la fonction du controller qui suprime un catway donné
router.delete('/:catwayNumber', auth, catwayController.deleteGivenCatway);


module.exports = router;