import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";


const getAllBlogs = async (req, res, next) => {
    let Blogs;
    try {
        Blogs = await Blog.find();
    } catch (err) {
        return console.log(err)
    }

    if(!Blogs){
        return res.status(404).json({message: "No Blogs Found"})
    }
    return res.status(200).json({ Blogs })
}

const createBlog = async (req, res, next) => {
    const {title, description, image, user } = req.body ;
    
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (err) {
        console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "unable to find the user by this id "})
    }

    const blog = new Blog({
        title, 
        description, 
        image, 
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err });
    }
    return res.status(200).json({ blog });
}
const updateBlog = async (req, res, next, ) => {
    const {title, description} = req.body;
    const blogId = req.params.id; 

    let  blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title, 
            description
        })
    } catch (error) {
            console.log(error)
    }

    if(!blog){
        return res.status(500).json({message: "Unable to update the blog"})
    }
    return res.status(200).json({ blog })
}   

const showBlog = async (req, res, next) => {
    const blogId = req.params.id ;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        console.log(error);
    }
    if(!blog){
        return res.status(404).json({message: "Blog Not Found !"});
    }

    return res.status(200).json({ blog })
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findOneAndRemove(id).populate('user');
    } catch (error) {
        console.log(error);
    }
    if(!blog){
        return res.status(404).json({message: "Cannot Find The Blog To Delete It "})
    }
    if (blog.user) {
        // Check if the 'user' property exists before accessing 'blogs'
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    return res.status(200).json({message: "Blog Deleted !"})
}

const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        console.log(error);
    }

    if(!userBlogs){
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
}
export {getAllBlogs, createBlog, updateBlog, showBlog, deleteBlog, getByUserId}