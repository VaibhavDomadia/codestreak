const express = require('express');

const emailRoutes = require('./routes/email');

const app = express();

app.use('/email', emailRoutes);

app.listen(8008);