const express = require('express');

const emailController = require('../controllers/email');

const router = express.Router();

/**
 * REST Endpoint: POST /email/contestannouncement
 */
router.post('/contestannouncement', emailController.sendContestAnnouncement);

/**
 * REST Endpoint: POST /email/verify
 */
router.post('/user/verify', emailController.sendEmailVerification);

/**
 * REST Endpoint: POST /email/resetpassword
 */
router.post('/user/resetpassword', emailController.sendResetPasswordEmail);

module.exports = router;