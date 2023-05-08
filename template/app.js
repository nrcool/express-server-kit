import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import indexRoutes from "./routes/indexRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose";
//load env variables
dotenv.config()

//port
const PORT = process.env.PORT || 8080; 

//initializing express server
const app = express()

//middlewares
app.use(cors({origin:"*"})) //handle cors error(allow all cross origins)
app.use(express.json()) //parse json data
app.use(express.urlencoded({extended:true}))//parse form-urlencoded data
app.use(express.static("views/public")) //serve static files from public folder

//Routes
// index
app.use("/", indexRoutes)
// users
app.use("/users",userRoutes)


//error handling middleware
app.use((err,req,res,next)=>{
    res.status(err.status||500).json({
        success:false, message:err.message
    })
})

mongoose.connect(process.env.URI,{dbName:process.env.DB}).then(()=>{
    console.log("👍,Connected to DB successfully! ")
    app.listen(PORT, ()=>console.log(`🔥,Server is running 🏃 on port: ${PORT}`))
}).catch(err=>{
    console.error(err.message)
})
//listening all requests
