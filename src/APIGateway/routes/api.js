const express = require('express');
const { route } = require('../../ProblemService/routes/problem');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Listening to API routes....');
})

module.exports = router;