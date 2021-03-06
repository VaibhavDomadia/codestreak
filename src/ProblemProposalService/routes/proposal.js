const express = require('express');

const proposalController = require('../controllers/proposal');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * REST Endpoint: GET /proposal/user
 */
router.get('/proposal/user', auth.isAuthenticated, proposalController.getUserProblemProposals);

/**
 * REST Endpoint: GET /proposal/:proposalID
 */
router.get('/proposal/:proposalID', auth.isAuthenticated, proposalController.getProblemProposal);

/**
 * REST Endpoint: GET /proposals
 */
router.get('/proposals', auth.isAuthenticated, proposalController.getProblemProposals);

/**
 * REST Endpoint: POST /proposal
 */
router.post('/proposal', auth.isAuthenticated, proposalController.createProblemProposal);

/**
 * REST Endpoint: PUT /proposal/:proposalID
 */
router.put('/proposal/:proposalID', auth.isAuthenticated, proposalController.updateProblemProposal);

/**
 * REST Endpoint: DELETE /proposal/:proposalID
 */
router.delete('/proposal/:proposalID', auth.isAuthenticated, proposalController.deleteProblemProposal);

/**
 * REST Endpoint: POST /proposal/:proposalID/status
 */
router.post('/proposal/:proposalID/status', auth.isAuthenticated, proposalController.updateStatus);

/**
 * REST Endpoint: POST /proposal/:proposalID/chat
 */
router.post('/proposal/:proposalID/chat', auth.isAuthenticated, proposalController.chat);

/**
 * REST Endpoint: PUT /proposal/:proposalID/chat/:messageID
 */
router.put('/proposal/:proposalID/chat/:messageID', auth.isAuthenticated, proposalController.editChatMessage);

/**
 * REST Endpoint: DELETE /proposal/:proposalID/chat/:messageID
 */
router.delete('/proposal/:proposalID/chat/:messageID', auth.isAuthenticated, proposalController.deleteChatMessage);

module.exports = router;