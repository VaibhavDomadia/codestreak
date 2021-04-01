const express = require('express');

const proposalRoutes = require('./routes/proposal');

const app = express();

/**
 * To Set Routes
 */
app.use(proposalRoutes);

app.listen(8006);