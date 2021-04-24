const express = require('express');

const emailController = require('../controllers/email');

const router = express.Router();

/**
 * REST Endpoint: POST /email/contestannouncement
 */
router.post('/contestannouncement', emailController.sendContestAnnouncement);

module.exports = router;