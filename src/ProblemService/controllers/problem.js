const Problem = require('../models/problem');

/**
 * Controller to fetch problem
 */
exports.getProblem = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            throw Error();
        }

        res.status(200).json({problem});
    }
    catch(error) {
        error.message = "Problem doesn't exists";
        error.statusCode = 404;
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
 * Controller to fetch test cases of a problem
 */
exports.getTestCases = async (req, res, next) => {
    const problemID = req.params.problemID;

    try {
        const problem = await Problem.findById(problemID, 'samplecases hiddencases');
        if(!problem) {
            throw Error();
        }
        res.status(200).json({
            cases: [...problem.samplecases, ...problem.hiddencases]
        });
    }
    catch(error) {
        error.message = "Problem doesn't exist";
        error.statusCode = 404;
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
    const { name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags} = req.body;

    try {
        const problem = await Problem.findById(problemID);
        if(!problem) {
            throw new Error();
        }
        
        const result = await Problem.findByIdAndUpdate(problemID, {name, difficulty, statement, samplecases, hiddencases, constraints, timeLimit, memoryLimit, tags})
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