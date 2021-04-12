const Proposal = require('../models/proposal');

/**
 * Controller to fetch a problem proposal
 */
exports.getProblemProposal = async (req, res, next) => {
    const proposalID = req.params.proposalID;

    try {
        try {
            const proposal = await Proposal.findById(proposalID);
        }
        catch (error) {
            error.message = "Proposal doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        if (!proposal) {
            const error = new Error("Proposal doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        if (proposal.userID != req.userID && !req.isAdmin) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({ proposal });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Controller to fetch all problem proposals
 */
exports.getProblemProposals = async (req, res, next) => {
    try {
        if (!req.isAdmin) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

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
        if (userID != req.userID) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

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

        if (proposal.userID != req.userID || proposal.userID != userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
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

        if (proposal.userID != req.userID || proposal.userID != userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const result = await Proposal.findByIdAndDelete(proposalID);
        res.status(200).json({
            message: "Problem Proposal Deleted!"
        });
    }
    catch (error) {
        next(error);
    }
}