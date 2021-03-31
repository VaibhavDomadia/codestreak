const express = require('express');

const problemController = require('../controllers/problem');

const router = express.Router();

router.get('/problems', problemController.getProblems);

router.get('/problem/:problemID', problemController.getProblem);

router.post('/problem', problemController.addProblem);

router.get('/problem/:problemID/hiddencases', problemController.getHiddenCases);

router.delete('/problem/:problemID', problemController.deleteProblem);

router.put('/problem/:problemID', problemController.updateProblem);

module.exports = router;