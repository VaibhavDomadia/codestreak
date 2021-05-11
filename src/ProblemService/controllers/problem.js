const Problem = require('../models/problem');

/**
 * Controller to fetch problem
 */
exports.getProblem = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        let problem;
        try {
            problem = await Problem.findById(problemID);
            if(!problem) {
                throw Error();
            }
        }
        catch(error) {
            error.message = "Problem doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        const currentTime = new Date().getTime();
        const accessTime = new Date(problem.accessTime).getTime();
        if(currentTime < accessTime) {
            const error = new Error("Access Denied!");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({problem});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to get a list of problems
 */
exports.getProblems = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const problemsPerPage = 10;
    let problemIDs = req.query.problemIDs;
    if(problemIDs) {
        problemIDs = problemIDs.split(',');
    }

    try {
        let totalNumberOfProblems = 0;
        let problems = [];
        const currentTime = new Date().getTime();
        if(problemIDs) {
            try {
                problems = await Problem.find({_id: problemIDs, accessTime: {$lte: currentTime}}, 'name difficulty solvedBy tags', {skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
                totalNumberOfProblems = await Problem.find({_id: problemIDs, accessTime: {$lte: currentTime}}).countDocuments();
            }
            catch(error) {
                error.message = "Please Enter valid problem IDs";
                error.statusCode = 404;
                throw error;
            }            
        }
        else {
            problems = await Problem.find({accessTime: {$lte: currentTime}}, 'name difficulty solvedBy tags', {skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
            totalNumberOfProblems = await Problem.find({accessTime: {$lte: currentTime}}).countDocuments();
        }        

        res.status(200).json({problems, totalNumberOfProblems});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to fetch test cases of a problem
 */
exports.getTestCases = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID, 'samplecases hiddencases timeLimit memory accessTime duration');
        if(!problem) {
            throw Error();
        }
        res.status(200).json({
            samplecases: problem.samplecases,
            hiddencases: problem.hiddencases,
            timeLimit: problem.timeLimit,
            memory: problem.memory,
            accessTime: problem.accessTime,
            duration: problem.duration
        });
    }
    catch(error) {
        error.message = "Problem doesn't exist";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to update number of submissions of a problem
 */
exports.updateNumberOfSubmissions = async (req, res, next) => {
    const problemID = req.params.problemID;
    const result = req.body.result;

    try {
        let problem;
        try {
            problem = await Problem.findById(problemID);
            if(!problem) {
                throw Error();
            }
        }
        catch(error) {
            error.message = "Problem doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        problem.numberOfSubmission++;
        if(result === 'Accepted') {
            problem.solvedBy++;
        }

        const savedProblem = await problem.save();

        res.status(200).json({problem: savedProblem});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to add problem
 */
exports.addProblem = async (req, res, next) => {
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime} = req.body;

    try {
        const problem = new Problem({name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime});

        const problemExists = await Problem.findOne({name});
        if(problemExists) {
            const error = new Error("Problem name already exists, Please choose another name");
            error.statusCode = 409;
            throw error;
        }

        const result = await problem.save();
        res.status(201).json({
            message: 'Problem Created',
            problem: result
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to delete a problem
 */
exports.deleteProblem = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            throw new Error();
        }

        const result = await Problem.findByIdAndDelete(problemID);
        res.status(200).json({
            message: "Problem Deleted!"
        })
    }
    catch(error) {
        error.message = 'Please enter a valid Problem ID';
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to update a problem
 */
exports.updateProblem = async (req, res, next) => {
    const problemID = req.params.problemID;
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime} = req.body;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            throw new Error();
        }
        
        const result = await Problem.findByIdAndUpdate(problemID, {name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime})
        res.status(200).json({
            message: "Problem Updated!"
        });
    }
    catch(error) {
        error.message = 'Please enter a valid Problem ID';
        error.statusCode = 404;
        next(error);
    }
}