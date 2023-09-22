import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import dotenv from "dotenv";
import blogRouter from "./routes/blog-routes.js";

//
dotenv.config();

const app = express();

const  DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

app.use(express.json());
// Routes 
    //  User Routes
app.use("/api/user", router); 
    // Blog Routes 
app.use("/api/blog", blogRouter)
mongoose.connect(DB_URI)
    .then(()=>app.listen(PORT))
    .then(()=>
        console.log("application is connected to mongodb and listening to PORT 5000")
    )
    .catch((error)=>console.log(error));