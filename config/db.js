const mongoose = require('mongoose');

const DB = process.env.MONGO_CONNECTION_URL;

// Database connection
function connectDB(){
    mongoose.connect(DB, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify : false
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database Connected');
    }).catch(err => {
        console.log('Connection failed');
    });
}

module.exports = connectDB;