const express = require('express');

const router = express.Router();

/**
 * REST Endpoint: GET /contests
 */
router.get('/contests');

/**
 * REST Endpoint: GET /contest/:contestID
 */
router.get('/contest/:contestID');

/**
 * REST Endpoint: POST /contest
 */
router.post('/contest');

/**
 * REST Endpoint: DELETE /contest/:contestID
 */
router.delete('/contest/:contestID');

/**
 * REST Endpoint: PUT /contest/:contestID
 */
router.put('/contest/:contestID');

module.exports = router;