const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home.controllers');

// Route racine
router.get('/',homeController.home);
module.exports = router;
