const express = require('express');
const axios = require('axios');

const router = express.Router();

const sendRequest = async (host, path, method, headers, body) => {
    try {
        const response = await axios({
            baseURL: host,
            url: path,
            method,
            headers,
            data: body
        });

        return response;
    }
    catch(error) {
        const statusCode = error.response.status;
        const message = error.response.data.message;
        const customError = new Error(message);
        customError.statusCode = statusCode;
        customError.body = error.response.data;
        throw customError;
    }
}

router.put('/user/:userID', async (req, res, next) => {
    const host = 'http://localhost:8001';
    const path = `${req.url}`;
    const { method, headers, body } = req;
    if(req.file) {
        body.profileImage = req.file.filename;
    }

    const sendHeaders = { authorization: headers.authorization };

    try {
        const response = await sendRequest(host, path, method, sendHeaders, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/user', async (req, res, next) => {
    const host = 'http://localhost:8001';
    const path = `/user${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/admin', async (req, res, next) => {
    const host = 'http://localhost:8001';
    const path = `/admin${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/problem', async (req, res, next) => {
    const host = 'http://localhost:8002';
    const path = `/problem${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/problems', async (req, res, next) => {
    const host = 'http://localhost:8002';
    const path = `/problems${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/contest', async (req, res, next) => {
    const host = 'http://localhost:8003';
    const path = `/contest${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/contests', async (req, res, next) => {
    const host = 'http://localhost:8003';
    const path = `/contests${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/blog', async (req, res, next) => {
    const host = 'http://localhost:8004';
    const path = `/blog${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/editorial', async (req, res, next) => {
    const host = 'http://localhost:8005';
    const path = `/editorial${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/proposal', async (req, res, next) => {
    const host = 'http://localhost:8006';
    const path = `/proposal${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/proposals', async (req, res, next) => {
    const host = 'http://localhost:8006';
    const path = `/proposals${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/submission', async (req, res, next) => {
    const host = 'http://localhost:8007';
    const path = `/submission${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

router.use('/email', async (req, res, next) => {
    const host = 'http://localhost:8008';
    const path = `/email${req.url}`;
    const { method, headers, body } = req;

    try {
        const response = await sendRequest(host, path, method, headers, body);

        res.status(response.status).json(response.data);
    }
    catch(error) {
        next(error);
    }
})

module.exports = router;