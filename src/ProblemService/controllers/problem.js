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
        console.log(error);
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