const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

/**
 * REST Endpoint: POST /user/login
 */
router.post('/login', userController.login);

/**
 * REST Endpoint: POST /user/signup
 */
router.post('/signup', userController.signup);

/**
 * REST Endpoint: PUT /user/:userID
 */
router.put('/:userID');

/**
 * REST Endpoint: GET /user/:userID
 */
router.get('/:userID', userController.getProfile);

module.exports = router;