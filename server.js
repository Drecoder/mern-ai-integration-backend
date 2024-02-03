const express = require('express');
const usersRouter = require('./routes/UsersRouter');
const app = express();
const PORT = process.env.PORT || 5000;


//----Routes----
app.use('/api/v1/users', usersRouter );
// start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

