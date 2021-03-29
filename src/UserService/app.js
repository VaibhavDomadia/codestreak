const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

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