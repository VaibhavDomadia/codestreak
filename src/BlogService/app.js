const express = require('express');

const blogRoutes = require('./routes/blog');

const app = express();

/**
 * To Set Routes
 */
app.use('/blog', blogRoutes);

app.listen(8004);