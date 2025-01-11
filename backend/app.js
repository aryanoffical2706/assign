const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

// Use routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

module.exports = app;
