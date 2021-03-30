const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    console.log('Listening to get...')
})

app.listen(8002);