const asyncHandler = require('express-async-handler');
const axios = require('axios');
const ContentHistory = require('../models/ContentHistory');
const User = require('../models/User');
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
        }
    );
// Send the response back to the client

const content = response?.data?.choices[0]?.text?.trim() || '';

// Create the history object
const newContent = await ContentHistory.create({ 
    user: req?.user?._id, 
    content,
});
// Push the content into the user
const userFound = await User.findById(req?.user?._id);
userFound.history.push(newContent?._id);
await userFound.save(); // Save the user
res.status(200).json(content);  // Sending the response data back to the client
 } catch (error) {
        console.error(error.stack);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = {
    openAIController
};
