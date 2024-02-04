const mongoose = require('mongoose');
// PASSWORD = 
const connectDB = async () => {
    try{
        const conn = await mongoose.connect()
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
    console.error(`Error connecting to MongoDB ${err.message}`);
    process.exit(1);
}        
};

module.exports = connectDB;