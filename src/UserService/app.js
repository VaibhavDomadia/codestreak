const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

mongoose.connect('mongodb://localhost:27017')
    .then(connect => {
        console.log('Database Connected!')
        app.listen(8001);
    })
    .catch(err => {
        console.log(err);
    })