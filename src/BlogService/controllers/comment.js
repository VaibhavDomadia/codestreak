const Blog = require('../models/blog');

/**
 * Controller to comment on a blog
 */
exports.addComment = async (req, res, next) => {
    const blogID = req.params.blogID;
    const content = req.body.content;
    console.log(blogID, content, req.userID, req.handle);

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