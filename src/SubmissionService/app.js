const express = require('express');

const submissionRoutes = require('./routes/submission');

const app = express();

/**
 * To Set Routes
 */
app.use('/submission', submissionRoutes);

app.listen(8007);