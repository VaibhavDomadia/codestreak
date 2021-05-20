const jsonWebToken = require('jsonwebtoken');

/**
 * Controller to validate token and check if the user is admin or not.
 */
exports.isAuthenticated = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            const error = new Error('Not Authenticated!');
            error.statusCode = 401;
            throw error;
        }

        let decodedToken;
        try {
            decodedToken = jsonWebToken.verify(token, 'secretKey');
        }
        catch(error) {
            error.statusCode = 401;
            throw error;
        }
        
        if(!decodedToken) {
            const error = new Error('Not Authenticated!');
            error.statusCode = 401;
            throw error;
        }

        req.userID = decodedToken.userID;
        req.isAdmin = decodedToken.isAdmin;
        if(!req.isAdmin) {
            const error = new Error('Not Authorized!');
            error.statusCode = 403;
            throw error;
        }
        next();
    }
    catch(error) {
        next(error);
    }
}