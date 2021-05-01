const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const app = express();
// const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 5000;

// Cors
// const corsOptions = {
//     origin : process.env.ALLOWED_CLIENTS.split(',')
// };
// app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(express.json());

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});