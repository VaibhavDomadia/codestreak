const express = require('express');

const proposalController = require('../controllers/proposal');

const router = express.Router();

/**
 * REST Endpoint: GET /proposal/:proposalID
 */
router.get('/proposal/:proposalID', proposalController.getProblemProposal);

/**
 * REST Endpoint: GET /proposals
 */
router.get('/proposals', proposalController.getProblemProposals);

/**
 * REST Endpoint: POST /proposal
 */
router.post('/proposal', proposalController.createProblemProposal);

/**
 * REST Endpoint: PUT /proposal/:proposalID
 */
router.put('/proposal/:proposalID', proposalController.updateProblemProposal);

/**
 * REST Endpoint: DELETE /proposal/:proposalID
 */
router.delete('/proposal/:proposalID', proposalController.deleteProblemProposal);

module.exports = router;