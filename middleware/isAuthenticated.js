    const asycHandler = require('express-async-handler');
    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    //middleware to check if the user is authenticated
    const isAuthenticated = asycHandler( async (req, res, next) => {
        if(req.cookies.token){
            //! Verify the token
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET); 
            // add the user to the requst object
            req.user = await User.findById(decoded.id).select('-password');
            return next();
        } else {
            return res.status(401).json({ message: 'Not authorized, to access this route, please login first.'});
        }
    });

    module.exports = isAuthenticated;