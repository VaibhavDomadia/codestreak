const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router();

/**
 * REST Endpoint: POST /blog/:blogID/comment
 */
router.post('/', commentController.addComment);

/**
 * REST Endpoint: PUT /blog/:blogID/comment/:commentID
 */
router.put('/:commentID');

/**
 * REST Endpoint: DELETE /blog/:blogID/comment/:commentID
 */
router.delete('/:commentID');

/**
 * REST Endpoint: POST /blog/:blogID/comment/:commentID/reply
 */
router.post('/:commentID/reply');

/**
 * REST Endpoint: PUT /blog/:blogID/comment/:commentID/reply/:replyID
 */
router.put('/:commentID/reply/:replyID');

/**
 * REST Endpoint: DELETE /blog/:blogID/comment/:commentID/reply/:replyID
 */
router.delete('/:commentID/reply/:replyID');

module.exports = router;