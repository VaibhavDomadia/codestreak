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

module.exports = router;