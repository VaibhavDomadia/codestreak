const axios = require('axios');

const Contest = require('../models/contest');

/**
 * Controller to fetch Contest
 */
exports.getContest = async (req, res, next) => {
    const contestID = req.params.contestID;

    try {
        let contest;
        try {
            contest = await Contest.findById(contestID);
            if(!contest) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "No Contest Found!"
            error.statusCode = 404;
            throw error;
        }

        const currentTime = new Date().getTime();

        if(currentTime >= contest.startTime) {
            const problemIDs = contest.problemIDs.join(',');

            const response = await axios.get(`http://localhost:8002/problems?ids=${problemIDs}`);
            const problems = response.data.problems;

            contest = {...contest._doc, problems};
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
    const contestPerPage = 10;

    try {
        const totalNumberOfContests = await Contest.find().countDocuments();
        const contests = await Contest.find({}, 'name startTime duration setters', {skip: (currentPage-1)*contestPerPage, limit: contestPerPage});
        res.status(200).json({contests, totalNumberOfContests});
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
        if(!req.isAdmin) {
            const error = new Error('Not Authorized!');
            error.statusCode = 403;
            throw error;
        }

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

/**
 * Controller to delete a contest
 */
exports.deleteContest = async (req, res, next) => {
    const contestID = req.params.contestID;

    try {
        if(!req.isAdmin) {
            const error = new Error('Not Authorized!');
            error.statusCode = 403;
            throw error;
        }

        const contest = await Contest.findById(contestID);
        if(!contest) {
            throw new Error();
        }

        const result = await Contest.findByIdAndDelete(contestID);
        res.status(200).json({
            message: "Contest Deleted!"
        })
    }
    catch(error) {
        error.message = 'Please enter a valid Contest ID';
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to update a contest
 */
exports.updateContest = async (req, res, next) => {
    const contestID = req.params.contestID;
    const {name, startTime, duration, setters, information, problemIDs} = req.body;

    try {
        if(!req.isAdmin) {
            const error = new Error('Not Authorized!');
            error.statusCode = 403;
            throw error;
        }

        const contest = await Contest.findById(contestID);
        if(!contest) {
            throw new Error();
        }

        const result = await Contest.findByIdAndUpdate(contestID, {name, startTime, duration, setters, information, problemIDs});
        res.status(200).json({
            message: "Contest Updated!"
        });
    }
    catch(error) {
        error.message = 'Please enter a valid Contest ID';
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to register for a contest
 */
exports.registerForContest = async (req, res, next) => {
    const userID = req.userID;
    const contestID = req.params.contestID;

    try {
        let contest;
        try {
            contest = await Contest.findById(contestID);
            if(!contest) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = 'Please enter a valid Contest ID';
            error.statusCode = 404;
            throw error;
        }

        const currentTime = new Date().getTime();
        if(currentTime >= contest.startTime) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const userFound = contest.registeredParticipants.find(user => user.userID == userID);
        if(!userFound) {
            contest.registeredParticipants.push({
                userID,
                handle: req.handle
            })
            contest.numberOfRegisteredParticipants++;
        }

        const result = await contest.save();

        res.status(200).json({
            contest: result
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to register for a contest
 */
exports.unregisterForContest = async (req, res, next) => {
    const userID = req.userID;
    const contestID = req.params.contestID;

    try {
        let contest;
        try {
            contest = await Contest.findById(contestID);
            if(!contest) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = 'Please enter a valid Contest ID';
            error.statusCode = 404;
            throw error;
        }

        const currentTime = new Date().getTime();
        if(currentTime >= contest.startTime) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const userFound = contest.registeredParticipants.find(user => user.userID == userID);
        if(userFound) {
            userFound.remove();
            contest.numberOfRegisteredParticipants--;
        }

        const result = await contest.save();

        res.status(200).json({
            contest: result
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to update contest standings when a submission is made
 */
exports.updateStandings = async (req, res, next) => {
    const contestID = req.params.contestID;
    const { problemID, userID, handle, time, solved} = req.body;

    try {
        let contest;
        try {
            contest = await Contest.findById(contestID);
            if(!contest) {
                throw Error();
            }
        }
        catch(error) {
            error.message = 'Contest Not Found';
            error.statusCode = 404;
            throw error;
        }

        const isUserRegistered = contest.registeredParticipants.find(participant => participant.userID.toString() === userID);

        if(isUserRegistered) {
            const userFound = contest.standings.find(participant => participant.userID.toString() === userID);
            if(userFound) {
                userFound.timeTaken += time;
                if(solved) {
                    const isProblemPresent = userFound.problemSolved.find(problemSolvedID => problemSolvedID.toString() === problemID);
                    if(isProblemPresent) {
                        userFound.timeTaken -= time;
                    }
                    else {
                        userFound.problemSolved.push(problemID);
                    }
                }
            }
            else {
                console.log('Hello');
                const user = {
                    userID,
                    handle,
                    timeTaken: time,
                    problemSolved: []
                }

                if(solved) {
                    user.problemSolved.push(problemID);
                }

                contest.standings.push(user);
            }
        }

        await contest.save();

        res.status(201).json({
            message: 'Standings Updated'
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to get contest standings
 */
exports.getStandings = async (req, res, next) => {
    const contestID = req.params.contestID;

    try {
        let contest;
        try {
            contest = await Contest.findById(contestID);
            if(!contest) {
                throw Error();
            }
        }
        catch(error) {
            error.message = 'Contest Not Found';
            error.statusCode = 404;
            throw error;
        }

        contest.standings.sort((user1, user2) => {
            if(user1.problemSolved.length === user2.problemSolved.length) {
                return user1.timeTaken - user2.timeTaken;
            }
            return user2.problemSolved.length - user1.problemSolved.length;
        });

        res.status(200).json({contest});
    }
    catch(error) {
        next(error);
    }
}