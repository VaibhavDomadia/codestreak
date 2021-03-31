const Contest = require('../models/contest');

/**
 * Controller to fetch Contest
 */
exports.getContest = async (req, res, next) => {
    const contestID = req.params.contestID;

    try {
        const contest = await Contest.findById(contestID);
        if(!contest) {
            const error = new Error("No Contest Found!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({contest});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to fetch all contests
 */
exports.getContests = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const contestPerPage = 2;

    try {
        const contests = await Contest.find({}, 'name startTime duration setters', {skip: (currentPage-1)*contestPerPage, limit: contestPerPage});
        res.status(200).json({contests});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to create contest
 */
exports.addContest = async (req, res, next) => {
    const {name, startTime, duration, setters, information, problemIDs} = req.body;

    try {
        const contest = new Contest({name, startTime, duration, setters, information, problemIDs});
        
        const result = await contest.save();
        res.status(201).json({
            message: 'Contest Created!',
            contest: result
        });
    }
    catch(error) {
        next(error);
    }
}