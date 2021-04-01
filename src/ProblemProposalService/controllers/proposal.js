const Proposal = require('../models/proposal');

/**
 * Controller to create a problem proposal
 */
exports.createProblemProposal = async (req, res, next) => {
    const { userID, handle, problem } = req.body;

    try {
        const proposal = new Proposal({ userID, handle, problem });
        const result = await proposal.save();

        res.status(201).json({
            message: 'Problem Proposal Recieved!',
            proposal: result
        });
    }
    catch (error) {
        next(error);
    }
}