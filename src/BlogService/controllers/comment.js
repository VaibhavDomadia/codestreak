const Blog = require('../models/blog');

/**
 * Controller to comment on a blog
 */
exports.addComment = async (req, res, next) => {
    const blogID = req.params.blogID;
    const content = req.body.content;    

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
            if(!blog) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Blog Not Found!";
            error.statusCode = 404;
            throw error;
        }

        blog.comments.push({
            userID: req.userID,
            handle: req.handle,
            content
        });

        const result = await blog.save();

        res.status(201).json({
            message: 'Commented!',
            blog: result
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
    const { blogID, commentID } = req.params;
    const content = req.body.content;

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
            if(!blog) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Blog Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const comment = blog.comments.id(commentID);
        if(!comment) {
            const error = new Error("Comment Not Found!");
            error.statusCode = 404;
            throw error;
        }
        comment.content = content;

        const result = await blog.save();

        res.status(201).json({
            message: 'Comment Updated!',
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to delete a comment
 */
exports.deleteComment = async (req, res, next) => {
    const { blogID, commentID } = req.params;

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
            if(!blog) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Blog Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const comment = blog.comments.id(commentID);
        if(!comment) {
            const error = new Error("Comment Not Found!");
            error.statusCode = 404;
            throw error;
        }
        comment.remove();

        const result = await blog.save();

        res.status(201).json({
            message: 'Comment Updated!',
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to reply on a comment
 */
exports.reply = async (req, res, next) => {
    const { blogID, commentID } = req.params;
    const content = req.body.content;

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
            if(!blog) {
                throw new Error();
            }
        }
        catch(error) {
            error.message = "Blog Not Found!";
            error.statusCode = 404;
            throw error;
        }

        const comment = blog.comments.id(commentID);
        if(!comment) {
            const error = new Error("Blog Not Found!");
            error.statusCode = 404;
            throw error;
        }

        comment.replies.push({
            userID: req.userID,
            handle: req.handle,
            content
        });

        const result = await blog.save();

        res.status(201).json({
            message: 'Replied on the comment!',
            blog: result
        });
    }
    catch(error) {
        next(error);
    }
}