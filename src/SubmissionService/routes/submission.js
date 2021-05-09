const express = require('express');

const submissionController = require('../controllers/submission');
const auth = require('../controllers/auth');

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
router.post('/', auth.isAuthenticated, submissionController.createSubmission);

/**
 * REST Endpoint: POST /submission/sampletest
 */
router.post('/sampletest', auth.isAuthenticated, submissionController.checkSubmissionForSampleTestCases);

/**
 * REST Endpoint: GET /submission/problem/:problemID
 */
 router.get('/problem/:problemID', submissionController.getProblemSubmissions);

module.exports = router;