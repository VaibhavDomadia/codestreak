const Blog = require('../models/blog');

/**
 * Controller to comment on a blog
 */
exports.addComment = async (req, res, next) => {
    const blogID = req.params.blogID;
    const content = req.body.content;

    try {
        const blog = await Blog.findById(blogID);
        if(!blog) {
            throw new Error();
        }

        blog.comment.push({
            userID: req.userID,
            handle: req.handle,
            content
        });

        const result = await blog.save();

        res.status(201).json({
            message: 'Commented!',
            comment: result
        });
    }
    catch(error) {
        next(error);
    }
}