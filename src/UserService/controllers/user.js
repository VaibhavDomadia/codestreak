const User = require('../models/user');

const bcrypt = require('bcryptjs');

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