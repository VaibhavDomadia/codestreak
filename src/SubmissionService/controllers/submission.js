const axios = require('axios');

const Submission = require('../models/submission');
const { executeJava } = require('../util/executeJava');
const { cleanupJava } = require('../util/helper');

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
    const { problemID, problemName, language, code } = req.body;
    const userID = req.userID;
    const handle = req.handle;

    try {
        const response = await axios.get(`http://localhost:8002/problem/${problemID}/testcases`);
        let testcases = [...response.data.samplecases, ...response.data.hiddencases];
        let timeLimit = response.data.timeLimit;
        let memory = response.data.memory;

        const verdict = await executeJava(code, testcases, timeLimit, memory);

        await cleanupJava();

        const submission = new Submission({ problemID, problemName, userID, handle, language, code, verdict });
        const result = await submission.save();

        res.status(201).json({
            message: 'Submission Created!',
            submission: result
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to check a submission for sample test cases
 */
exports.checkSubmissionForSampleTestCases = async (req, res, next) => {
    const { problemID, problemName, language, content } = req.body;
    const userID = req.userID;
    const handle = req.handle;    
    const verdict = {
        result: "Accepted",
        log: "Correct Answer!"
    }

    try {
        const response = await axios.get(`http://localhost:8002/problem/${problemID}/testcases`);
        let testcases = [...response.data.samplecases, ...response.data.hiddencases];

        const submission = new Submission({ problemID, problemName, userID, handle, language, content, verdict });
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