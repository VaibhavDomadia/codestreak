const { Error } = require('mongoose');
const Proposal = require('../models/proposal');

/**
 * Controller to fetch a problem proposal
 */
exports.getProblemProposal = async (req, res, next) => {
    const proposalID = req.params.proposalID;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
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
    const status = req.query.status;

    try {
        if (!req.isAdmin) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

        let proposals;

        if(status === 'Approved' || status === 'Pending' || status === 'ChangeRequired' || status === 'Rejected') {
            proposals = await Proposal.find({status});
        }
        else {
            proposals = await Proposal.find();
        }

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

        if (proposal.userID != req.userID && !req.isAdmin) {
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

/**
 * Controller to update status of a problem proposal
 */
exports.updateStatus = async (req, res, next) => {
    const proposalID = req.params.proposalID;
    const { status, message } = req.body;

    try {
        if(!req.isAdmin) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
            if(!proposal) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Proposal Not Found!";
            error.statusCode = 404;
            throw error;
        }

        proposal.status = status;
        proposal.message = message;

        await proposal.save();

        res.status(200).json({
            message: 'Status Updated!'
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to fetch a list of problem proposals made by a user
 */
exports.getUserProblemProposals = async (req, res, next) => {
    const userID = req.params.userID;

    try {
        if(userID != req.userID) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

        const proposals = await Proposal.find({userID});

        res.status(200).json({proposals});
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to chat
 */
exports.chat = async (req, res, next) => {
    const proposalID = req.params.proposalID;
    const message = req.body.message;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
            if(!proposal) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Problem Proposal Not Found!";
            error.statusCode = 404;
            throw error;
        }

        if(req.isAdmin) {
            proposal.chat.push({
                sentBy: 'admin',
                message
            });
        }
        else if(req.userID === proposal.userID.toString()) {
            proposal.chat.push({
                sentBy: 'user',
                message
            })
        }
        else {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        await proposal.save();

        res.status(201).json({
            message: 'Message Sent'
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to edit a chat message
 */
exports.editChatMessage = async (req, res, next) => {
    const { proposalID, messageID } = req.params;
    const updateMessage = req.body.message;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
            if(!proposal) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Problem Proposal Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const message = proposal.chat.id(messageID);
        if(!message) {
            const error = new Error("Message Not Found!");
            error.statusCode = 404;
            throw error;
        }

        const isAuthorized = (req.isAdmin && message.sentBy === 'admin') || (!req.isAdmin && message.sentBy === 'user' && req.userID === proposal.userID.toString());

        if(!isAuthorized) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;   
        }

        message.message = updateMessage;

        await proposal.save();

        res.status(200).json({
            message: 'Message Edited'
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to delete a chat message
 */
exports.deleteChatMessage = async (req, res, next) => {
    const { proposalID, messageID } = req.params;

    try {
        let proposal;
        try {
            proposal = await Proposal.findById(proposalID);
            if(!proposal) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Problem Proposal Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const message = proposal.chat.id(messageID);
        if(!message) {
            const error = new Error("Message Not Found!");
            error.statusCode = 404;
            throw error;
        }

        const isAuthorized = (req.isAdmin && message.sentBy === 'admin') || (!req.isAdmin && message.sentBy === 'user' && req.userID === proposal.userID.toString());

        if(!isAuthorized) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;   
        }

        message.remove();

        await proposal.save();

        res.status(200).json({
            message: 'Message Deleted'
        });
    }
    catch(error) {
        next(error);
    }
}