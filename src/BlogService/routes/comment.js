const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router({mergeParams: true});

/**
 * REST Endpoint: POST /blog/:blogID/comment
 */
router.post('/', commentController.addComment);

/**
 * REST Endpoint: PUT /blog/:blogID/comment/:commentID
 */
router.put('/:commentID', commentController.updateComment);

/**
 * REST Endpoint: DELETE /blog/:blogID/comment/:commentID
 */
router.delete('/:commentID', commentController.deleteComment);

/**
 * REST Endpoint: POST /blog/:blogID/comment/:commentID/reply
 */
router.post('/:commentID/reply', commentController.reply);

/**
 * REST Endpoint: PUT /blog/:blogID/comment/:commentID/reply/:replyID
 */
router.put('/:commentID/reply/:replyID');

/**
 * REST Endpoint: DELETE /blog/:blogID/comment/:commentID/reply/:replyID
 */
router.delete('/:commentID/reply/:replyID');

module.exports = router;