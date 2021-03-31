const express = require('express');

const contestRoutes = require('./routes/contest');

const app = express();

app.use(contestRoutes);

app.listen(8003);