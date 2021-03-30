const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const Admin = require('../models/admin');

/**
 * Controller to login into admin account
 */
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const admin = await Admin.findOne({email});
        if(!admin) {
            const error = new Error("Wrong email id or password");
            error.statusCode = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if(!isPasswordCorrect) {
            const error = new Error("Wrong email id or password");
            error.statusCode = 401;
            throw error;
        }

        const token = jsonWebToken.sign({email, userID: admin._id.toString(), isAdmin: true}, 'secretKey', {expiresIn: '1h'});
        res.status(200).json({
            token,
            userID: admin._id.toString()
        });
    }
    catch(error) {
        next(error);
    }
}