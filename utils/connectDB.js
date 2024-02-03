const mongoose = require('mongoose');
// PASSWORD = 
const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://andresariasrecruiter:5zi9ML99L72FbMoM@mern-ai-integration.tzolwsx.mongodb.net/?retryWrites=true&w=majority");

        console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
    console.error(`Error connecting to MongoDB ${err.message}`);
    process.exit(1);
}        
};

module.exports = connectDB;