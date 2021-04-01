const express = require('express');

const router = express.Router();

/**
 * REST Endpoint: GET /proposal/:proposalID
 */
router.get('/proposal/:proposalID');

/**
 * REST Endpoint: GET /proposals
 */
router.get('/proposals');

/**
 * REST Endpoint: POST /proposal
 */
router.post('/proposal');

/**
 * REST Endpoint: PUT /proposal/:proposalID
 */
router.put('/proposal/:proposalID');

/**
 * REST Endpoint: DELETE /proposal/:proposalID
 */
router.delete('/proposal/:proposalID');

module.exports = router;