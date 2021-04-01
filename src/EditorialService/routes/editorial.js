const express = require('express');

const editorialController = require('../controllers/editorial');

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
router.post('/', editorialController.createEditorial);

/**
 * REST Endpoint: PUT /editorial/:editorialID
 */
router.put('/:editorialID');

/**
 * REST Endpoint: DELETE /editorial/:editorialID
 */
router.delete('/:editorialID');

module.exports = router;