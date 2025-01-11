const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://localhost:27017/yourdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));




const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');


app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

module.exports = app;
