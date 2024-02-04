const User = require('../models/User');
const bcrypt = require('bcryptjs');    
    
    //------Registration
    const register =  async (req, res) => {
       try {
        console.log('Request Body:', req.body);

        const { username, email, password } = req.body
        //Validate
        if(!username || !email || !password) {
            res.status(400)
            throw new Error('Please enter all fields')
        }

        //Check the email is taken
        const userExist = await User.findOne({ email });

        if(userExist){
            res.status(400)
            throw new Error('User already exists with this email addess')
        }
        //Hash the user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,               
        })
        //Add the date the trial will expire
        newUser.trialExpires = new Date(
            new Date().getTime() + newUser.trialPeriods * 24 * 60 * 60 * 1000
        );
        //Save the user
        await newUser.save();

        res.json({
            status: 'success',
            message: 'Registration was successful',
            user: { username, email },
        });
       } catch (error) {
        console.error(`Error in register function: ${error.message}`);
        res.status(500).json({
          status: 'error',
          message: 'Internal Server Error',
        });
    };
}
    //------abc Registration 
    //------Logout-----
    //------Profile-----
    //------Check user Auth Status

    module.exports = {
        register,
    };