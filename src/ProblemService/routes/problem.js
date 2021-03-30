const express = require('express');

const router = express.Router();

router.get('/problems');

router.get('/problem/:problemID');

router.post('/problem');

router.get('/problem/:problemID/hiddencases');

router.delete('/problem/:problemID');

router.put('/problem/:problemID');

module.exports = router;