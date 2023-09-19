import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";

const app = express();

app.use("/api/user", router); 
mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.y6cb01b.mongodb.net/Blog?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(5000))
    .then(()=>
        console.log("application is connected to mongodb and listening to PORT 5000")
    )
    .catch((error)=>console.log(error));