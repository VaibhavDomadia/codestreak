const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const axios = require('axios');
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

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            const error = new Error("Email or Password is Wrong.")
            error.statusCode = 401;
            throw error;
        }

        const token = jsonWebToken.sign({email, userID: user._id.toString(), handle: user.handle}, 'secretKey', {expiresIn: '1h'});
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
    const limit = 5;

    try {
        let user;
        try {
            user = await User.findById(userID, '-email -password -following -followedBy');
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
        }
        catch(error) {
            error.message = "Please provide a valid user id";
            error.statusCode = 404;
            throw error;
        }

        if(!userToFollow) {
            const error = new Error("Please provide a valid user id");
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
        if(isUserFollowed) {
            const error = new Error("You are already following the user");
            error.statusCode = 409;
            throw error;
        }

        user.following.push(userIDToFollow);
        userToFollow.followedBy.push(req.userID);

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
        }
        catch(error) {
            error.message = "Please provide a valid user id";
            error.statusCode = 404;
            throw error;
        }

        if(!userToUnfollow) {
            const error = new Error("Please provide a valid user id");
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
        if(!isUserFollowed) {
            const error = new Error("You are already not following the user");
            error.statusCode = 409;
            throw error;
        }

        user.following = user.following.filter(userID => userID != userIDToUnfollow);
        userToUnfollow.followedBy = userToUnfollow.followedBy.filter(userID => userID != req.userID);

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