const Editorial = require('../models/editorial');

/**
 * Controller to fetch a editorial
 */
exports.getEditorial = async (req, res, next) => {
    const editorialID = req.params.editorialID;

    try {
        let editorial;
        try {
            editorial = await Editorial.findById(editorialID);
            if (!editorial) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Editorial doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        editorial.views++;
        const result = await editorial.save();
        res.status(200).json({ editorial: result });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Controller to fetch all editorials of a problem
 */
exports.getProblemEditorials = async (req, res, next) => {
    const problemID = req.params.problemID;
    const currentPage = req.query.page || 1;
    let sort = req.query.sort || '-createdAt';
    let tags = req.query.tags;
    const editorialsPerPage = 10;

    let sortOptions = ['createdAt', 'title', 'views', 'numberOfComments', '-createdAt', '-title', '-views', '-numberOfComments'];
    if(!sortOptions.includes(sort)) {
        sort = '-createdAt';
    }

    let sortOrder = 1;
    if(sort.startsWith('-')) {
        sortOrder = -1;
        sort = sort.substring(1);
    }

    const sortObject = {};
    sortObject[sort] = sortOrder;

    const filters = { problemID };
    if(tags && tags.length !== 0) {
        filters.tags = { $in: tags.split(',') };
    }

    try {
        const totalNumberOfEditorials = await Editorial.find(filters).countDocuments();
        const editorials = await Editorial.find(filters, '-content -comments', {sort: sortObject, skip: (currentPage-1)*editorialsPerPage, limit: editorialsPerPage});

        res.status(200).json({ editorials, totalNumberOfEditorials });
    }
    catch (error) {
        error.message = "Problem doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}


/**
 * Controller to create a Editorial
 */
exports.createEditorial = async (req, res, next) => {
    const { problemID, problemName, title, content, tags } = req.body;
    const userID = req.userID;
    const handle = req.handle;

    try {
        const editorial = new Editorial({ userID, problemID, problemName, handle, title, content, tags });
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

/**
 * Controller to update a editorial
 */
exports.updateEditorial = async (req, res, next) => {
    const editorialID = req.params.editorialID;
    const { title, content, tags } = req.body;

    try {
        let editorial;
        try {
            editorial = await Editorial.findById(editorialID);
        }
        catch (error) {
            error.message = "Editorial doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        if (!editorial) {
            const error = new Error("Editorial doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        if(editorial.userID != req.userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const result = await Editorial.findByIdAndUpdate(editorialID, { title, content, tags });
        res.status(200).json({
            message: "Editorial Updated!"
        });
    }
    catch (error) {
        next(error);
    }
}

/**
 * Controller to delete a editorial
 */
exports.deleteEditorial = async (req, res, next) => {
    const editorialID = req.params.editorialID;

    try {
        let editorial;
        try {
            editorial = await Editorial.findById(editorialID);
        }
        catch (error) {
            error.message = "Editorial doesn't exists";
            error.statusCode = 404;
            throw error;
        }

        if (!editorial) {
            const error = new Error("Editorial doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        if(editorial.userID != req.userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const result = await Editorial.findByIdAndDelete(editorialID);
        res.status(200).json({
            message: "Editorial Deleted!"
        });
    }
    catch (error) {
        next(error);
    }
}