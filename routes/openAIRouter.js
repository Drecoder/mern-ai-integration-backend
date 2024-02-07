const express = require('express');
const { openAIController } = require('../controllers/openAIController');
const isAuthenticated = require('../middleware/isAuthenticated');   
const openAIRouter = express.Router();  

openAIRouter.post('/generate', isAuthenticated, openAIController);


module.exports = openAIRouter;  // Export the router