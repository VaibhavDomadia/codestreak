const express = require('express');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(8001);