const express = require('express');

const problemController = require('../controllers/problem');

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
router.post('/problem', problemController.addProblem);

/**
 * REST Endpoint: GET /problem/:problemID/hiddencases
 */
router.get('/problem/:problemID/hiddencases', problemController.getHiddenCases);

/**
 * REST Endpoint: DELETE /problem/:problemID
 */
router.delete('/problem/:problemID', problemController.deleteProblem);

/**
 * REST Endpoint: PUT /problem/:problemID
 */
router.put('/problem/:problemID', problemController.updateProblem);

module.exports = router;