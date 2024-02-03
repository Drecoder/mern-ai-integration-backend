    //------Registration
    const register =  async (req, res) => {
        res.json({
            status: 'success',
            message: 'Registion was successful'
        });
    };
    //------abc Registration 
    //------Logout-----
    //------Profile-----
    //------Check user Auth Status

    module.exports = {
        register,
    };