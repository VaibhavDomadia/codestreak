const express = require('express');

const submissionController = require('../controllers/submission');

const router = express.Router();

/**
 * REST Endpoint: GET /submission/:submissionID
 */
router.get('/:submissionID', submissionController.getSubmission);

/**
 * REST Endpoint: GET /submission/user/:userID
 */
router.get('/user/:userID', submissionController.getUserSubmissions);

/**
 * REST Endpoint: POST /submission
 */
router.post('/', submissionController.createSubmission);

/**
 * REST Endpoint: GET /submission/problem/:problemID
 */
 router.get('/problem/:problemID');

module.exports = router;