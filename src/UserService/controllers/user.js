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

        const handleTaken = await User.findOne({handle});
        if(handleTaken) {
            const error = new Error("Handle already taken, please select any other handle");
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
        if(!user) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({user});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to update user profile
 */
exports.updateProfile = async (req, res, next) => {
    const userID = req.params.userID;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const handle = req.body.handle;
    const country = req.body.country;
    const organization = req.body.organization;

    try {
        const user = await User.findById(userID);
        if(!user) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        if(user.handle !== handle) {
            const isHandleTaken = await User.findOne({handle});
            if(isHandleTaken) {
                const error = new Error("Handle already taken, please select any other handle");
                error.statusCode = 409;
                throw error;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {firstName, lastName, handle, country, organization}, {new: true});
        res.status(200).json({message: "Profile Updated!"});
    }
    catch(error) {
        next(error);
    }
}