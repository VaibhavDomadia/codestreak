const Editorial = require('../models/editorial');

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
