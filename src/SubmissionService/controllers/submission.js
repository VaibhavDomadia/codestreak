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
 * Controller to fetch all submissions of a user
 */
exports.getUserSubmissions = async (req, res, next) => {
    const userID = req.params.userID;
    const limit = parseInt(req.query.limit) || 0;

    try {
        const submissions = await Submission.find({ userID }, '-content', {limit});

        res.status(200).json({ submissions });
    }
    catch (error) {
        error.message = "User doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to fetch all submissions of a problem
 */
exports.getProblemSubmissions = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const submissions = await Submission.find({ problemID });

        res.status(200).json({ submissions });
    }
    catch (error) {
        error.message = "Problem doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to create a submission
 */
exports.createSubmission = async (req, res, next) => {
    const { problemID, problemName, userID, content } = req.body;
    const handle = req.handle;    
    const verdict = {
        result: "Accepted",
        log: "Correct Answer!"
    }

    try {
        const submission = new Submission({ problemID, problemName, userID, handle, content, verdict });
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