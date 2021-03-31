const express = require('express');

const problemController = require('../controllers/problem');

const router = express.Router();

router.get('/problems');

router.get('/problem/:problemID');

router.post('/problem', problemController.addProblem);

router.get('/problem/:problemID/hiddencases');

router.delete('/problem/:problemID');

router.put('/problem/:problemID');

module.exports = router;