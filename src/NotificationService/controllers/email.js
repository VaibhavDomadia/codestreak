const nodemailer = require('nodemailer');

const config = require('../config/config');

const baseURL = 'http://localhost:3000';

/**
 * Controller to send email to all users to notify about upcoming contest
 */
exports.sendContestAnnouncement = async (req, res, next) => {
    const contest = req.body.contest;
    if(!contest) {
        const error = new Error("Contest Data Missing");
        error.statusCode = 400;
        throw error;
    }

    const { name, startTime, duration, setters, information } = contest;

    const message = `
        <h1>${name} is about to come</h1>
        <h2>The contest will start on ${new Date(startTime)}</h2>
        <h3>The contest duration is ${duration} milliseconds</h3>
        <p>The problem setters for this contest are: ${setters.join(', ')}</p>
        ${information.map(info => `<p>${info}</p>`)}
    `;

    try {
        const users = ['vjdomadia@gmail.com', 'vjdomadia2411@gmail.com'];

        const transporter = nodemailer.createTransport({
            host: config.NODEMAILER_HOST,
            port: config.NODEMAILER_PORT,
            secure: config.NODEMAILER_SECURE,
            auth: {
                user: config.NODEMAILER_USER,
                pass: config.NODEMAILER_PASSWORD
            }
        });

        let results;
        try {
            const promises = [];
            for(const user of users) {
                promises.push(transporter.sendMail({
                    from: config.NODEMAILER_USER,
                    to: user,
                    subject: name,
                    text: `Register for ${name}`,
                    html: message
                }));
            }

            results = await Promise.all(promises);
        }
        catch(error) {
            throw error;
        }

        res.status(200).json({
            message: "Email Sent!"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to send email to users to verify their email id.
 */
exports.sendEmailVerification = async (req, res, next) => {
    const { emailID, handle, token } = req.body;

    const title = 'Verify Your Email Address';

    const url = `${baseURL}/verify/${token}`;

    const body = `
        <h3>Hi, ${handle},</h3>
        <p>
            Thank you for creating account on our platform. We hope that you get to learn and practice a
            lot from this site. Before you start using our platform, we want you to verify your email address
            by visiting this <a href='${url}'>site</a>.
        </p>
    `;

    try {
        const transporter = nodemailer.createTransport({
            host: config.NODEMAILER_HOST,
            port: config.NODEMAILER_PORT,
            secure: config.NODEMAILER_SECURE,
            auth: {
                user: config.NODEMAILER_USER,
                pass: config.NODEMAILER_PASSWORD
            }
        });

        transporter.sendMail({
            from: config.NODEMAILER_USER,
            to: emailID,
            subject: title,
            text: `Verify your Email Address`,
            html: body
        });

        res.status(200).json({
            message: "Email Sent for verification!"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to send email to users to reset their password.
 */
exports.sendResetPasswordEmail = async (req, res, next) => {
    const { emailID, handle, token } = req.body;

    const title = 'Reset password';

    const url = `${baseURL}/resetpassword/${token}`;

    const body = `
        <h3>Hi, ${handle},</h3>
        <p>
            You have requested for resetting your password. You can reset your password using this <a href='${url}'>link</a>. Visit the link and enter your new password.
        </p>
    `;

    try {
        const transporter = nodemailer.createTransport({
            host: config.NODEMAILER_HOST,
            port: config.NODEMAILER_PORT,
            secure: config.NODEMAILER_SECURE,
            auth: {
                user: config.NODEMAILER_USER,
                pass: config.NODEMAILER_PASSWORD
            }
        });

        transporter.sendMail({
            from: config.NODEMAILER_USER,
            to: emailID,
            subject: title,
            text: `Reset Password`,
            html: body
        });

        res.status(200).json({
            message: "Email Sent for Resetting the password!"
        });
    }
    catch(error) {
        next(error);
    }
}