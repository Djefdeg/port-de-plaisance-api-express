const express =require('express');
const router = express.Router();

const catwayController = require ('../controllers/catway.Controller');

//Appel de la fonction du controller qui affiche la liste des catway
router.get('/',catwayController.getAllCatways);

//Appel de la fonction du controller qui affiche un catway donné
router.get('/:catwayNumber',catwayController.getGivenCatway);

//Appel de la fonction du controller qui ajoute un catway
router.post('/',catwayController.createCatway);

//Appel de la fonction du controller qui modifie un catway donné
router.patch('/:catwayNumber',catwayController.updateGivenCatway);

//Appel de la fonction du controller qui suprime un catway donné
router.delete('/:catwayNumber',catwayController.deleteGivenCatway);


module.exports = router;