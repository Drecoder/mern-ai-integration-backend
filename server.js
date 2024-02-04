const express = require('express');
const usersRouter = require('./routes/UsersRouter');
require('./utils/connectDB')(); // connect to the database
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); // parse JSON request body

//----Routes----
app.use('/api/v1/users', usersRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });

// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

