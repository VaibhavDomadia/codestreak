const Editorial = require('../models/editorial');

/**
 * Controller to comment on a Editorial
 */
exports.addComment = async (req, res, next) => {
    const editorialID = req.params.editorialID;
    const content = req.body.content;

    try {
        let editorial;
        try {
            editorial = await Editorial.findById(editorialID);
            if(!editorial) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Editorial Not Found!";
            error.statusCode = 404;
            throw error;
        }

        editorial.comments.push({
            userID: req.userID,
            handle: req.handle,
            content
        });

        const result = await editorial.save();

        res.status(201).json({
            message: 'Commented!',
            editorial: result
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to update a comment
 */
exports.updateComment = async (req, res, next) => {
    const { editorialID, commentID } = req.params;
    const content = req.body.content;

    try {
        let editorial;
        try {
            editorial = await Editorial.findById(editorialID);
            if(!editorial) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Editorial Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const comment = editorial.comments.id(commentID);
        if(!comment) {
            const error = new Error("Comment Not Found!");
            error.statusCode = 404;
            throw error;
        }

        if(comment.userID.toString() !== req.userID) {
            const error = new Error("Not Authorized!");
            error.statusCode = 403;
            throw error;
        }

        comment.content = content;

        const result = await editorial.save();

        res.status(200).json({
            message: 'Comment Updated!',
        });
    }
    catch(error) {
        next(error);
    }
}