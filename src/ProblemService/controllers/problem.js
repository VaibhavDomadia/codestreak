const Problem = require('../models/problem');

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