const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.put('/:userID');

router.get('/:userID', (req, res, next) => {
    res.send('Login Route Set!');
});

module.exports = router;