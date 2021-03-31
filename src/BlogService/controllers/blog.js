const Blog = require('../models/blog');

/**
 * Controller to create a blog
 */
exports.createBlog = async (req, res, next) => {
    const {userID, handle, title, content, tags} = req.body;

    try {
        const blog = new Blog({userID, handle, title, content, tags});
        const result = await blog.save();

        res.status(201).json({
            message: 'Blog Created!',
            blog: result
        });
    }
    catch(error) {
        next(error);
    }
}