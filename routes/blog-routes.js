import express  from "express"
const router = express.Router();
import { getAllBlogs, createBlog, updateBlog } from "../controllers/blog-controller.js";
const  blogRouter = express.Router();
blogRouter.get("/", getAllBlogs);
blogRouter.post("/create", createBlog);
blogRouter.put("/update/:id", updateBlog);

 export default blogRouter