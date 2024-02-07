const asyncHandler = require('express-async-handler');
const axios = require('axios');

//----OPENAI API----

const openAIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "gpt-3.5-turbo-instruct",
            prompt,
            max_tokens: 2000,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        // Handle the response here
        console.log(response.data); // Logging the response data
        res.status(200).json(response.data); // Sending the response data back to the client
    } catch (error) {
        console.error(error.stack);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = {
    openAIController
};
