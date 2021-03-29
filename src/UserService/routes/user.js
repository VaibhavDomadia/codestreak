const express = require('express');

const router = express.Router();

router.post('/login');

router.post('/signup');

router.put('/:userID');

router.get('/:userID', (req, res, next) => {
    res.send('Login Route Set!');
});

module.exports = router;