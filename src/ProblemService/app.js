const express = require('express');

const problemRoutes = require('./routes/problem');

const app = express();

app.use(problemRoutes);

app.listen(8002);