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

/**
 * Controller to update a blog
 */
exports.updateBlog = async (req, res, next) => {
    const blogID = req.params.blogID;
    const {userID, handle, title, content, tags} = req.body;

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
        }
        catch(error) {
            error.message = "Blog doesn't exists";
            error.statusCode = 404;
            throw error;
        }
        
        if(!blog) {
            const error = new Error("Blog doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        if(blog.userID != req.userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const result = await Blog.findByIdAndUpdate(blogID, {userID, handle, title, content, tags});
        res.status(200).json({
            message: "Blog Updated!"
        });
    }
    catch(error) {
        next(error);
    }
}

/**
 * Controller to delete a blog
 */
exports.deleteBlog = async (req, res, next) => {
    const blogID = req.params.blogID;

    try {
        let blog;
        try {
            blog = await Blog.findById(blogID);
        }
        catch(error) {
            console.log("Here....")
            error.message = "Blog doesn't exists";
            error.statusCode = 404;
            throw error;
        }
        
        if(!blog) {
            const error = new Error("Blog doesn't exists");
            error.statusCode = 404;
            throw error;
        }

        if(blog.userID != req.userID) {
            const error = new Error("Not Authorized");
            error.statusCode = 403;
            throw error;
        }

        const result = await Blog.findByIdAndDelete(blogID);
        res.status(200).json({
            message: "Blog Deleted!"
        });
    }
    catch(error) {
        next(error);
    }
}