const Submission = require('../models/submission');

/**
 * Controller to fetch a submission
 */
exports.getSubmission = async (req, res, next) => {
    const submissionID = req.params.submissionID;

    try {
        const submission = await Submission.findById(submissionID);
        if (!submission) {
            throw new Error();
        }

        res.status(200).json({ submission });
    }
    catch (error) {
        error.message = "Submission doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

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