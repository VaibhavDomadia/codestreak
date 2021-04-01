const express = require('express');

const blogController = require('../controllers/blog');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * REST Endpoint: GET /blog/:blogID
 */
router.get('/:blogID', blogController.getBlog);

/**
 * REST Endpoint: GET /blog/user/:userID
 */
router.get('/user/:userID', blogController.getUserBlogs);

/**
 * REST Endpoint: POST /blog
 */
router.post('/', auth.isAuthenticated, blogController.createBlog);

/**
 * REST Endpoint: PUT /blog/:blogID
 */
router.put('/:blogID', auth.isAuthenticated, blogController.updateBlog);

/**
 * REST Endpoint: DELETE /blog/:blogID
 */
router.delete('/:blogID', auth.isAuthenticated, blogController.deleteBlog);

module.exports = router;