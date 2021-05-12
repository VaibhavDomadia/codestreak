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
    let sortBy = req.query.sort || '-accessTime';
    let tags = req.query.tags;
    let difficulty = req.query.difficulty || 'All';
    const problemsPerPage = 10;
    let problemIDs = req.query.problemIDs;
    if(problemIDs) {
        problemIDs = problemIDs.split(',');
    }

    let sortObject = {};
    let sortOptions = ['accessTime', 'name', 'solvedBy', '-accessTime', '-name', '-solvedBy'];
    if(!sortOptions.includes(sortBy)) {
        sortBy = '-accessTime';
    }

    let sortOrder = 1;
    if(sortBy.startsWith('-')) {
        sortOrder = -1;
        sortBy = sortBy.substring(1);
    }

    sortObject[sortBy] = sortOrder;

    const currentTime = new Date().getTime();
    let filters = { accessTime: {$lte: currentTime}};
    if(tags && tags.length !== 0) {
        filters.tags = { $in: tags.split(',') };
    }
    
    let difficultyOptions = ['Easy', 'Medium', 'Hard'];
    if(difficulty !== 'All' && difficultyOptions.includes(difficulty)) {
        filters.difficulty = difficulty;
    }

    try {
        let totalNumberOfProblems = 0;
        let problems = [];
        
        if(problemIDs) {
            try {
                problems = await Problem.find({_id: problemIDs, ...filters}, 'name difficulty solvedBy tags accessTime', {sort: sortObject, skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
                totalNumberOfProblems = await Problem.find({_id: problemIDs, ...filters}).countDocuments();
            }
            catch(error) {
                error.message = "Please Enter valid problem IDs";
                error.statusCode = 404;
                throw error;
            }            
        }
        else {
            problems = await Problem.find({...filters}, 'name difficulty solvedBy tags accessTime', {sort: sortObject, skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
            totalNumberOfProblems = await Problem.find({...filters}).countDocuments();
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
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime, duration} = req.body;

    try {
        const problem = new Problem({name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime, duration});

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
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime, duration} = req.body;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            throw new Error();
        }
        
        const result = await Problem.findByIdAndUpdate(problemID, {name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags, accessTime, duration})
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