const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router({mergeParams: true});

/**
 * REST Endpoint: POST /editorial/:editorialID/comment
 */
router.post('/', commentController.addComment);

/**
 * REST Endpoint: PUT /editorial/:editorialID/comment/:commentID
 */
router.put('/:commentID', commentController.updateComment);

/**
 * REST Endpoint: DELETE /editorial/:editorialID/comment/:commentID
 */
router.delete('/:commentID');

/**
 * REST Endpoint: POST /editorial/:editorialID/comment/:commentID/reply
 */
router.post('/:commentID/reply');

/**
 * REST Endpoint: PUT /editorial/:editorialID/comment/:commentID/reply/:replyID
 */
router.put('/:commentID/reply/:replyID');

/**
 * REST Endpoint: DELETE /editorial/:editorialID/comment/:commentID/reply/:replyID
 */
router.delete('/:commentID/reply/:replyID');

module.exports = router;