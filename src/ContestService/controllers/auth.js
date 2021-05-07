const jsonWebToken = require('jsonwebtoken');

/**
 * Controller to validate token and check if the user is admin or not
 */
exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            const error = new Error('Not Authenticated!');
            error.statusCode = 401;
            throw error;
        }

        const decodedToken = jsonWebToken.verify(token, 'secretKey');
        if(!decodedToken) {
            const error = new Error('Not Authenticated!');
            error.statusCode = 401;
            throw error;
        }

        req.userID = decodedToken.userID;
        req.handle = decodedToken.handle;
        req.isAdmin = decodedToken.isAdmin;
        next();
    }
    catch(error) {
        next(error);
    }
}