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

        let decodedToken;
        try {
            decodedToken = jsonWebToken.verify(token, 'secretKey');
        }
        catch(error) {
            error.statusCode = 401;
            throw error;
        }

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