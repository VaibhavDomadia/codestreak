const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

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

        if(user.emailVerificationToken) {
            const error = new Error("Please Verify Your Email Address.");
            error.statusCode = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            const error = new Error("Email or Password is Wrong.")
            error.statusCode = 401;
            throw error;
        }

        const token = jsonWebToken.sign({email, userID: user._id.toString(), handle: user.handle}, 'secretKey', {expiresIn: '24h'});
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
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed, please input valid data",
            errors: errors.array()
        });
    }

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

        crypto.randomBytes(32, async (error, buffer) => {
            if(error) {
                throw error;
            }
            else {
                const emailVerificationToken = buffer.toString('hex');

                const user = new User({firstName, lastName, email, password: hashedPassword, handle, emailVerificationToken});
                const result = await user.save();

                const response = await axios.post('http://localhost:8008/email/user/verify', {
                    emailID: email,
                    handle,
                    token: emailVerificationToken
                });

                res.status(201).json({
                    message: "Account Created!, An Email has been sent to your email address, please verify your email to proceed"
                });
            }
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to verify email verification token
 */
exports.verifyToken = async (req, res, next) => {
    const { token } = req.body;

    try {
        const user = await User.findOne({emailVerificationToken: token});
        if(!user) {
            const error = new Error("No Such Email Verification Token Found");
            error.statusCode = 404;
            throw error;
        }

        user.emailVerificationToken = null;
        await user.save();
        res.status(200).json({
            message: "Email Verification Successful"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to send email for resetting the password
 */
exports.forgotPassword = async (req, res, next) => {
    const email = req.body.email;

    try {
        let user;
        try {
            user = await User.findOne({email});
            if(!user) {
                throw Error();
            }
        }
        catch(error) {
            error.message = `Email Address doesn't Exist. Please Enter a valid email address.`
            error.statusCode = 404;
            throw error;
        }

        crypto.randomBytes(32, async (error, buffer) => {
            if(error) {
                throw error;
            }
            else {
                const resetPasswordToken = buffer.toString('hex'); 
                user.resetPasswordToken = resetPasswordToken;
                user.resetPasswordTokenExpiryTime = new Date().getTime() + 3600000;
                await user.save();

                const response = await axios.post('http://localhost:8008/email/user/resetpassword', {
                    emailID: user.email,
                    handle: user.handle,
                    token: resetPasswordToken
                });

                res.status(200).json({
                    message: "An Email has been sent to your Email Address. Please follow the instruction given in email to reset your password."
                });
            }
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to reset user password
 */
exports.resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({resetPasswordToken: token, resetPasswordTokenExpiryTime: {$gt: new Date().getTime()}});
        if(!user) {
            const error = new Error("No Such Password Reset Token Found");
            error.statusCode = 404;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiryTime = null;
        await user.save();

        res.status(200).json({
            message: 'Your Password has been updated, Login to continue.'
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
    const limit = 5;

    try {
        let user;
        try {
            user = await User.findById(userID, '-email -password -following -followedBy -emailVerificationToken -resetPasswordToken -resetPasswordTokenExpiryTime');
            if(!user) {
                throw Error();
            }
        }
        catch(error) {
            error.message = "User doesn't exist";
            error.statusCode = 404;
            throw error;
        }

        let response = await axios.get(`http://localhost:8007/submission/user/${userID}?limit=${limit}`);
        const submissions = response.data.submissions;

        response = await axios.get(`http://localhost:8004/blog/user/${userID}?limit=${limit}`);
        const blogs = response.data.blogs;

        user = {...user._doc, submissions, blogs};
        
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
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed, please input valid data",
            errors: errors.array()
        });
    }
    
    const { firstName, lastName, country, organization, profileImage } = req.body;
    const userID = req.userID;

    const saveData = { firstName, lastName, country, organization };
    if(profileImage) {
        saveData.profileImage = profileImage;
    }

    try {
        const user = await User.findById(userID);
        if(!user) {
            const error = new Error("User doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        const updatedUser = await User.findByIdAndUpdate(userID, saveData)
        res.status(200).json({message: "Profile Updated!"});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to follow a user
 */
exports.followUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed, please input valid data",
            errors: errors.array()
        });
    }

    const userIDToFollow = req.body.userID;

    try {
        let userToFollow;
        try {
            userToFollow = await User.findById(userIDToFollow);
            if(!userToFollow) {
                throw Error();
            }
        }
        catch(error) {
            error.message = "Please provide a valid user id";
            error.statusCode = 404;
            throw error;
        }

        const user = await User.findById(req.userID);
        if(!user) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        const isUserFollowed = user.following.includes(userIDToFollow);
        if(!isUserFollowed) {
            user.following.push(userIDToFollow);
            userToFollow.followedBy.push(req.userID);
        }

        await user.save();
        await userToFollow.save();
        
        res.status(201).json({
            message: "User followed"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to unfollow a user
 */
exports.unfollowUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: "Validation failed, please input valid data",
            errors: errors.array()
        });
    }

    const userIDToUnfollow = req.body.userID;

    try {
        let userToUnfollow;
        try {
            userToUnfollow = await User.findById(userIDToUnfollow);
            if(!userToUnfollow) {
                throw Error();
            }
        }
        catch(error) {
            error.message = "Please provide a valid user id";
            error.statusCode = 404;
            throw error;
        }

        const user = await User.findById(req.userID);
        if(!user) {
            const error = new Error("Not Authenticated!");
            error.statusCode = 401;
            throw error;
        }

        const isUserFollowed = user.following.includes(userIDToUnfollow);
        if(isUserFollowed) {
            user.following = user.following.filter(userID => userID != userIDToUnfollow);
            userToUnfollow.followedBy = userToUnfollow.followedBy.filter(userID => userID != req.userID);    
        }

        await user.save();
        await userToUnfollow.save();
        
        res.status(201).json({
            message: "User Unfollowed"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to fetch a list of users the current user is following
 */
exports.getFollowingList = async (req, res, next) => {
    const userID = req.userID;

    try {
        const user = await User.findById(userID);

        const followingUsers = await User.find({_id: user.following}, 'rating handle');

        res.status(200).json({
            users: followingUsers
        })
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to get ratings of users
 */
exports.ratings = async (req, res, next) => {
    const { users } = req.body;

    try {
        let userRatings;
        try {
            userRatings = await User.find({_id: { $in: users }}, 'rating');
        }
        catch(error) {
            error.message = 'Users Not Found';
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({users: userRatings});
    }
    catch(error) {
        next(error)
    }
}

/**
 * Controller to update ratings of users
 */
exports.updateRatings = async (req, res, next) => {
    const { users, ratingsChange } = req.body;

    try {
        for(let i=0 ; i<users.length ; i++) {
            let user;
            try {
                user = await User.findById(users[i]);
                if(!user) {
                    throw Error();
                }
            }
            catch(error) {
                error.message = 'User Not Found';
                error.statusCode = 404;
                throw error;
            }

            user.rating += ratingsChange[i];

            await user.save();
        }

        res.status(200).json({
            message: 'Ratings Updated'
        })
    }
    catch(error) {
        next(error);
    }
}