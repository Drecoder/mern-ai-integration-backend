const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
   if(!req.user){
    return res.status(401).json({message: 'Unauthorized'});
   }
   // Find the user 
    const user = await User.findById(req?.user?.id);
    if(!req.user){
        return res.status(404).json({message: 'User not fond'});
    }
    let requestLimit = 0;
    // check the user trial status
    if(user?.isTrialActive){
        requestLimit = user?.monthlyRequestCount;
    }
   // check if user has exceeded the request limit
   if(user?.apiRequestCount >= requestLimit){
       throw new Error('You have exceeded the monthly request limit, please upgrade your subscription to continue using the service.');
   };
    next();
});

module.exports = checkApiRequestLimit;