const Problem = require('../models/problem');

/**
 * Controller to fetch problem
 */
exports.getProblem = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            const error = new Error("Problem doesn't exists");
            error.statusCode = 404;
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
    const problemsPerPage = 2;
    let problemIDs = req.query.problemIDs;
    if(problemIDs) {
        problemIDs = problemIDs.split(',');
    }

    try {
        const totalNumberOfProblems = await Problem.find().countDocuments();
        let problems = [];
        if(problemIDs) {
            try {
                problems = await Problem.find({_id: problemIDs}, 'name difficulty solvedBy tags', {skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
            }
            catch(error) {
                error.message = "Please Enter valid problem IDs";
                error.statusCode = 404;
                throw error;
            }            
        }
        else {
            problems = await Problem.find({}, 'name difficulty solvedBy tags', {skip: (currentPage-1)*problemsPerPage, limit: problemsPerPage});
        }        

        res.status(200).json({problems, totalNumberOfProblems});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to fetch hidden cases of a problem
 */
exports.getHiddenCases = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID, 'hiddencases');
        res.status(200).json({hiddencases: problem.hiddencases});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to add problem
 */
exports.addProblem = async (req, res, next) => {
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags} = req.body;

    try {
        const problem = new Problem({name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags});
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