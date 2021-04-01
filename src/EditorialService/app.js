const express = require('express');

const editorialRoutes = require('./routes/editorial');

const app = express();

/**
 * To Set Routes
 */
app.use('/editorial', editorialRoutes);

app.listen(8005);