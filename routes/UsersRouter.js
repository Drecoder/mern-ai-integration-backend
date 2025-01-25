const express = require('express');
const { 
    register, 
    login, 
    logout, 
    userProfile 
} = require('../controllers/usersController');
const { submitApplication } = require('../controllers/applicationController'); // Assuming you create this controller

const usersRouter = express.Router();

// User routes
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.post('/logout', logout);
usersRouter.get('/profile', userProfile);

// Application route (open to the public)
usersRouter.post('/jobs/:serialNumber/apply', submitApplication); // No authentication required

module.exports = usersRouter;
