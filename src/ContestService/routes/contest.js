const express = require('express');

const contestController = require('../controllers/contest');

const router = express.Router();

/**
 * REST Endpoint: GET /contests
 */
router.get('/contests', contestController.getContests);

/**
 * REST Endpoint: GET /contest/:contestID
 */
router.get('/contest/:contestID', contestController.getContest);

/**
 * REST Endpoint: POST /contest
 */
router.post('/contest', contestController.addContest);

/**
 * REST Endpoint: DELETE /contest/:contestID
 */
router.delete('/contest/:contestID');

/**
 * REST Endpoint: PUT /contest/:contestID
 */
router.put('/contest/:contestID');

module.exports = router;