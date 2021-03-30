const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/user');

/**
 * Controller to login into user account
 */
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({email});
        if(!user) {
            const error = new Error("Email or Password is Wrong.");
            error.statusCode = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            const error = new Error("Email or Password is Wrong.")
            error.statusCode = 401;
            throw error;
        }

        const token = jsonWebToken.sign({email, userID: user._id.toString()}, 'secretKey', {expiresIn: '1h'});
        res.status(200).json({
            token,
            userID: user._id.toString()
        })
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to create a User Account
 */
exports.signup = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const handle = req.body.handle;

    try {
        const userExist = await User.findOne({email});
        if(userExist) {
            const error = new Error("This email id is already registered, please use another email id.");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({firstName, lastName, email, password: hashedPassword, handle});
        const result = await user.save();
        res.status(201).json({
            message: "Account Created!"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to get user profile
 */
exports.getProfile = async (req, res, next) => {
    const userID = req.params.userID;

    try {
        const user = await User.findById(userID, '-email -password');
        res.status(200).json({user});
    }
    catch(error) {
        next(error);
    }
}