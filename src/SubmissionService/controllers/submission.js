const Submission = require('../models/submission');

/**
 * Controller to create a submission
 */
exports.createSubmission = async (req, res, next) => {
    const { problemID, userID, content } = req.body;
    const verdict = {
        result: "Accepted",
        log: "Correct Answer!"
    }

    try {
        const submission = new Submission({ problemID, userID, content, verdict });
        const result = await submission.save();

        res.status(201).json({
            message: 'Submission Created!',
            submission: result
        });
    }
    catch (error) {
        next(error);
    }
}