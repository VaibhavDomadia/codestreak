const express = require('express');

const router = express.Router();

/**
 * REST Endpoint: GET /submission/:submissionID
 */
router.get('/:submissionID');

/**
 * REST Endpoint: GET /submission/user/:userID
 */
router.get('/user/:userID');

/**
 * REST Endpoint: POST /submission
 */
router.post('/');

/**
 * REST Endpoint: GET /submission/problem/:problemID
 */
 router.get('/problem/:problemID');

module.exports = router;