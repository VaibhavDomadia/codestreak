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
 * REST Endpoint: POST /user/ratings
 */
 router.post('/ratings', userController.ratings);

 /**
  * REST Endpoint: PUT /user/ratings
  */
 router.put('/ratings', userController.updateRatings);

/**
 * REST Endpoint: PUT /user/:userID
 */
router.put('/:userID', auth.isAuthenticated, [
    body('firstName').trim().isLength({min: 1}).withMessage('Please provide first name'),
    body('lastName').trim().isLength({min: 1}).withMessage('Please provide last name')
], userController.updateProfile);

/**
 * REST Endpoint: GET /user/following
 */
 router.get('/following', auth.isAuthenticated, userController.getFollowingList);

/**
 * REST Endpoint: GET /user/:userID
 */
router.get('/:userID', userController.getProfile);

/**
 * REST Endpoint: POST /user/follow
 */
router.post('/follow', auth.isAuthenticated, [
    body('userID').trim().isLength({min: 1}).withMessage('Please provide user id')
], userController.followUser);

/**
 * REST Endpoint: POST /user/unfollow
 */
router.post('/unfollow', auth.isAuthenticated, [
    body('userID').trim().isLength({min: 1}).withMessage('Please provide user id')
], userController.unfollowUser);

/**
 * REST Endpoint: POST /user/verify
 */
router.post('/verify', userController.verifyToken);

/**
 * REST Endpoint: POST /user/forgotpassword
 */
router.post('/forgotpassword', userController.forgotPassword);

/**
 * REST Endpoint: POST /user/resetpassword
 */
router.post('/resetpassword', userController.resetPassword);

module.exports = router;