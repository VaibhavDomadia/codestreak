const Blog = require('../models/blog');

/**
 * Controller to fetch a blog
 */
exports.getBlog = async (req, res, next) => {
    const blogID = req.params.blogID;

    try {
        const blog = await Blog.findById(blogID);
        if(!blog) {
            throw new Error();
        }

        res.status(200).json({blog});
    }
    catch(error) {
        error.message = "Blog doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

/**
 * Controller to fetch all blogs of a user
 */
exports.getUserBlogs = async (req, res, next) => {
    const userID = req.params.userID;

    try {
        const blogs = await Blog.find({userID});

        res.status(200).json({blogs});
    }
    catch(error) {
        error.message = "User doesn't exists";
        error.statusCode = 404;
        next(error);
    }
}

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