const Proposal = require('../models/proposal');

/**
 * Controller to fetch a problem proposal
 */
exports.getProblemProposal = async (req, res, next) => {
    const proposalID = req.params.proposalID;

    try {
        const proposal = await Proposal.findById(proposalID);
        if (!proposal) {
            throw new Error();
        }

        res.status(200).json({ proposal });
    }
    catch (error) {
        error.message = "Proposal doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to fetch all problem proposals
 */
exports.getProblemProposals = async (req, res, next) => {
    try {
        const proposals = await Proposal.find();

        res.status(200).json({ proposals });
    }
    catch (error) {
        next(error);
    }
}

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

/**
 * Controller to update a problem proposal
 */
exports.updateProblemProposal = async (req, res, next) => {
    const proposalID = req.params.proposalID;
    const { userID, handle, problem } = req.body;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
        }
        catch (error) {
            error.message = "Problem Proposal doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        if (!proposal) {
            const error = new Error("Problem Proposal doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        const result = await Proposal.findByIdAndUpdate(proposalID, { userID, handle, problem });
        res.status(200).json({
            message: "Problem Proposal Updated!"
        });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Controller to delete a problem proposal
 */
 exports.deleteProblemProposal = async (req, res, next) => {
    const proposalID = req.params.proposalID;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
        }
        catch(error) {
            error.message = "Problem Proposal doesn't exists";
            error.statusCode = 404;
            throw error;
        }
        
        if(!proposal) {
            const error = new Error("Problem Proposal doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        const result = await Proposal.findByIdAndDelete(proposalID);
        res.status(200).json({
            message: "Problem Proposal Deleted!"
        });
    }
    catch(error) {
        next(error);
    }
}