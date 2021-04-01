const Editorial = require('../models/editorial');

/**
 * Controller to fetch a editorial
 */
 exports.getEditorial = async (req, res, next) => {
    const editorialID = req.params.editorialID;

    try {
        const editorial = await Editorial.findById(editorialID);
        if(!editorial) {
            throw new Error();
        }

        res.status(200).json({editorial});
    }
    catch(error) {
        error.message = "Editorial doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to create a Editorial
 */
exports.createEditorial = async (req, res, next) => {
    const { userID, problemID, handle, title, content, tags } = req.body;

    try {
        const editorial = new Editorial({ userID, problemID, handle, title, content, tags });
        const result = await editorial.save();

        res.status(201).json({
            message: 'Editorial Created!',
            editorial: result
        });
    }
    catch (error) {
        next(error);
    }
}
