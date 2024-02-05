const User = require('../models/User');
const jwt = require('jsonwebtoken');
const  asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');    
    
    //------Registration
    const register = asyncHandler( async (req, res) => {
 
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
             user: { 
                username, 
                email, 
            },
         });
});
    //------Login-----
    const login = asyncHandler( async (req, res) => {
        console.log('Request Body:', req.body);
 
        const { email, password } = req.body
        //Validate
        if(!email || !password) {
            res.status(400)
            throw new Error('Please enter all fields')
        }
 
        //Check the email is taken
        const user = await User.findOne({ email });
        console.log('User:', user)  
        if(!user){
            res.status(401)
            throw new Error('Invalid email or password')
        }
        //Check the password
        const isMatch = await bcrypt.compare(password, user?.password);
 
        if(!isMatch){
            res.status(400)
            throw new Error('Invalid password')
        }
        //Generate a token (jwt)
        const token =  jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '3d', //Token will expire in 3 days
        });
        console.log(token);
        //set the token in the cookie (http only)
        res.cookie('token', token, {
            httpOnly: true,
            secure:process.env.NODE_ENV === 'production', //set to true in production
            sameSite:'strict', //set to strict in production
            maxAge:  24 * 60 * 60 * 1000, //1 days
        });
        //send the user data
        res.json({
            status: 'success',
            _id: user?._id,
            message: 'Login was successful',
            user: { 
                username: user?.username, 
                email: user?.email, 
            },
        });
    });
    //------Logout-----
    const logout = asyncHandler( async (req, res) => {
    res.cookie('token', '', {maxAge: 1});
    res.status(200).json({message: "Logged out successfully"});
    });
    //------Profile-----
    const userProfile = asyncHandler( async (req, res) => {
        const id = '65beedce906f2fb712870dd9';    
        const user = await User.findById(id).select('-password');
        if(user){
            res.status(200).json({
                status: 'success',
                user,
            })
        }
        else{
            res.status(404)
            throw new Error('User not found')
        }
    });
    //------Check user Auth Status

    module.exports = {
        register,
        login,
        logout,
        userProfile,
    };