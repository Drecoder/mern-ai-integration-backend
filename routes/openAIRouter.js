const express = require('express');
const checkApiRequestLimit = require('../middleware/checkApiRequestLimit');
const { openAIController } = require('../controllers/openAIController');
const isAuthenticated = require('../middleware/isAuthenticated');   
const openAIRouter = express.Router();  

openAIRouter.post(
    '/generate', 
    isAuthenticated, 
    checkApiRequestLimit,
    openAIController
);

 
module.exports = openAIRouter;  // Export the router