const express = require('express');

const commentRoutes = require('./comment');
const editorialController = require('../controllers/editorial');
const auth = require('../controllers/auth');

const router = express.Router();

/**
 * REST Endpoint: GET /editorial/:editorialID
 */
router.get('/:editorialID', editorialController.getEditorial);

/**
 * REST Endpoint: GET /editorial/problem/:problemID
 */
router.get('/problem/:problemID', editorialController.getProblemEditorials);

/**
 * REST Endpoint: POST /editorial
 */
router.post('/', auth.isAuthenticated, editorialController.createEditorial);

/**
 * REST Endpoint: PUT /editorial/:editorialID
 */
router.put('/:editorialID', auth.isAuthenticated, editorialController.updateEditorial);

/**
 * REST Endpoint: DELETE /editorial/:editorialID
 */
router.delete('/:editorialID', auth.isAuthenticated, editorialController.deleteEditorial);

/**
 * Routes to handle comments
 */
router.use('/:editorialID/comment', auth.isAuthenticated, commentRoutes);

module.exports = router;