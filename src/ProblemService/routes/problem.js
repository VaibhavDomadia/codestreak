const express = require('express');

const problemController = require('../controllers/problem');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * REST Endpoint: GET /problems
 */
router.get('/problems', problemController.getProblems);

/**
 * REST Endpoint: GET /problem/:problemID
 */
router.get('/problem/:problemID', problemController.getProblem);

/**
 * REST Endpoint: POST /problem
 */
router.post('/problem', auth.isAuthenticated, problemController.addProblem);

/**
 * REST Endpoint: GET /problem/:problemID/testcases
 */
router.get('/problem/:problemID/testcases', problemController.getTestCases);

/**
 * REST Endpoint: DELETE /problem/:problemID
 */
router.delete('/problem/:problemID', auth.isAuthenticated, problemController.deleteProblem);

/**
 * REST Endpoint: PUT /problem/:problemID
 */
router.put('/problem/:problemID', auth.isAuthenticated, problemController.updateProblem);

module.exports = router;