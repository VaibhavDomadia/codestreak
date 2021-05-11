const jsonWebToken = require('jsonwebtoken');

/**
 * Controller to validate token
 */
exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        const decodedToken = jsonWebToken.verify(token, 'secretKey');
        if(!decodedToken) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        req.userID = decodedToken.userID;
        req.isAdmin = decodedToken.isAdmin;
        req.handle = decodedToken.handle;
        next();
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to validate token if present and store userID
 */
exports.optionalAuthentication = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(token) {
            const decodedToken = jsonWebToken.verify(token, 'secretKey');
            if(decodedToken) {
                req.userID = decodedToken.userID;
            }
        }

        next();
    }
    catch(error) {
        next(error);
    }
}