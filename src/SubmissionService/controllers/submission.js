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
        let submission;
        try {
            submission = await Submission.findById(submissionID);
            if (!submission) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Submission doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        const currentTime = new Date().getTime();
        const accessTime = submission.accessTime;

        const isAccessAllowedToUser = req.userID === submission.userID.toString();

        if(currentTime < accessTime && !isAccessAllowedToUser) {
            const error = new Error("Access Denied!");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ submission });
    }
    catch (error) {
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
        const submissions = await Submission.find({ userID }, '-content', {sort: {createdAt: -1}, limit});

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
        const submissions = await Submission.find({ problemID }, '-content', {sort: {createdAt: -1}});

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
        let accessTime = new Date(response.data.accessTime).getTime();
        let duration = response.data.duration;
        let contestID = response.data.contestID;

        let currentTime = new Date().getTime();

        if(currentTime < accessTime) {
            const error = new Error("Access Denied!");
            error.statusCode = 403;
            throw error;
        }

        const verdict = await executeJava(code, testcases, timeLimit, memory);

        await cleanupJava();

        const submission = new Submission({ problemID, problemName, userID, handle, language, code, verdict, accessTime: accessTime + duration });
        const result = await submission.save();

        await axios.post(`http://localhost:8002/problem/${problemID}/submission`, {result: verdict.result});

        if(currentTime >= accessTime && currentTime < accessTime + duration) {
            const isProblemSolved = verdict.result === 'Accepted';
            const penalty = 300000;
            await axios.post(`http://localhost:8003/contest/${contestID}/submission`, {
                userID,
                handle,
                problemID,
                time: isProblemSolved ? currentTime-accessTime : penalty,
                solved: isProblemSolved
            });
        }

        res.status(201).json({
            message: 'Submission Created!',
            submission: result
        });
    }
    catch(error) {
        next(error);
    }
}