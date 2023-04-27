const express=require("express");
const {connection}=require("./config/db.js");
const cors=require("cors")
require("dotenv").config();

const { userRouter } = require("./routes/userRouter.js");

const app=express(); 
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Server is working");
})



app.listen(process.env.PORT,async()=>{
    try {  
        await connection
        console.log("Connected to DB");
    } catch (error) {
        
    }
    console.log("Server is Running on ",process.env.PORT);
})