const nodemailer = require('nodemailer');

const config = require('../config/config');

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