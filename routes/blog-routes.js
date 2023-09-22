import express  from "express"
const router = express.Router();
import { getAllBlogs, createBlog, updateBlog, showBlog, deleteBlog, getByUserId } from "../controllers/blog-controller.js";
const  blogRouter = express.Router();


blogRouter.get("/", getAllBlogs);
blogRouter.post("/create", createBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", showBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);

 export default blogRouter