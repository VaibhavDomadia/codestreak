const express = require('express');

const blogController = require('../controllers/blog');

const router = express.Router();

/**
 * REST Endpoint: GET /blog/:blogID
 */
router.get('/:blogID');

/**
 * REST Endpoint: GET /blog/user/:userID
 */
router.get('/user/:userID');

/**
 * REST Endpoint: POST /blog
 */
router.post('/', blogController.createBlog);

/**
 * REST Endpoint: PUT /blog/:blogID
 */
router.put('/:blogID');

/**
 * REST Endpoint: DELETE /blog/:blogID
 */
router.delete('/:blogID');

module.exports = router;