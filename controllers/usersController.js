const bcrypt = require('bcrypt');    
    
    //------Registration
    const register =  async (req, res) => {
       try {
        const[Username, email, password] = req.body
        //Validate
        if(!username || !email || !password) {
            res.status(400)
            throw new Error('Please enter all fields')
        }

        //Check the email is take
        const userExist = await User.findOne({email});

        if(userExist){
            res.status(400)
            throw new Error('User already')
        }
        //Hash the user password
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,               
        })
        res.json({
            status: 'success',
            message: 'Registion was successful'
        });
       } catch (error) {

    };
    //------abc Registration 
    //------Logout-----
    //------Profile-----
    //------Check user Auth Status

    module.exports = {
        register,
    };