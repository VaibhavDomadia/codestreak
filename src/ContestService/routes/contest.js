const express = require('express');

const contestController = require('../controllers/contest');
const auth = require('../controllers/auth');

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
router.post('/contest', auth.isAuthenticated, contestController.addContest);

/**
 * REST Endpoint: DELETE /contest/:contestID
 */
router.delete('/contest/:contestID', auth.isAuthenticated, contestController.deleteContest);

/**
 * REST Endpoint: PUT /contest/:contestID
 */
router.put('/contest/:contestID', auth.isAuthenticated, contestController.updateContest);

module.exports = router;