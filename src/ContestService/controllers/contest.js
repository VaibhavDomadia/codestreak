const Contest = require('../models/contest');

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