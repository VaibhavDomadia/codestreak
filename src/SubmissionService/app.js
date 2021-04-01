const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
    console.log('Listening....');
})

app.listen(8007);