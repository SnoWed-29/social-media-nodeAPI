import Blog from "../model/Blog.js";

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
    const blog = new Blog({
        title, 
        description, 
        image, 
        user
    });
    try {
        await blog.save();
    } catch (err) {
        console.log(err);
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
export {getAllBlogs, createBlog, updateBlog}