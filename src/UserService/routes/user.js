const express = require('express');
const { body } = require('express-validator/check');

const userController = require('../controllers/user');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * REST Endpoint: POST /user/login
 */
router.post('/login', userController.login);

/**
 * REST Endpoint: POST /user/signup
 */
router.post('/signup', [
    body('email').trim().isEmail().normalizeEmail().withMessage('Please Enter a valid Email ID'),
    body('password').trim().isLength({min: 8}).withMessage('Password should be atleast 8 character long'),
    body('firstName').trim().isLength({min: 1}).withMessage('Please provide first name'),
    body('lastName').trim().isLength({min: 1}).withMessage('Please provide last name'),
    body('handle').trim().isLength({min: 1}).withMessage('Please provide handle')
], userController.signup);

/**
 * REST Endpoint: PUT /user/:userID
 */
router.put('/:userID', auth.isAuthenticated, [
    body('firstName').trim().isLength({min: 1}).withMessage('Please provide first name'),
    body('lastName').trim().isLength({min: 1}).withMessage('Please provide last name'),
    body('handle').trim().isLength({min: 1}).withMessage('Please provide handle')
], userController.updateProfile);

/**
 * REST Endpoint: GET /user/:userID
 */
router.get('/:userID', userController.getProfile);

/**
 * REST Endpoint: POST /user/follow
 */
router.post('/follow');

module.exports = router;