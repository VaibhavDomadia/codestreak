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