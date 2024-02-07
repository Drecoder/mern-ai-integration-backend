const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // load environment variables
const usersRouter = require('./routes/UsersRouter');
const openAIController = require('./routes/openAIRouter');
require('./utils/connectDB')(); // connect to the database
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // parse JSON request body
app.use(cookieParser()); // parse cookie header

//----Routes----
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/openai', openAIController);
// error handler middleware
app.use(errorHandler); 

// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

