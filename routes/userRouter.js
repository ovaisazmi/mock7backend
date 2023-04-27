const express=require("express");
const {userModel}=require("../models/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const e = require("express");
const userRouter=express.Router();
const {authentication}=require("../middleware/Authenticator");


userRouter.get("/get",async(req,res)=>{
    try {
        let user=await userModel.find();
        if(user){
            res.send(user);
        }else{
            res.send("user not found");
        }
    } catch (error) {
        res.send({"Error":error.message});
    }
})


userRouter.get("/getProfile/:id",authentication,async(req,res)=>{
    const ID=req.params.id;
    try {
        let user=await userModel.findOne({_id:ID});
        if(user){
            res.send(user);
        }else{
            res.send("user not found");
        }
    } catch (error) {
        res.send({"Error":error.message});
    }
})



userRouter.post("/register",async(req,res)=>{
    let {img,name,email,password,phone,bio}=req.body;
    try {
        bcrypt.hash(password,4,async(error,hashed)=>{
            if(hashed){
              let user=new userModel({img,name,email,password:hashed,phone,bio});
              await user.save();
              res.send({"Mess":"User Created"})
            }else{
                res.send({"Error":error.message})
            }
        })
    } catch (error) {
        res.send({"Error":error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
      let user=await userModel.findOne({email})
      if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(result){
                let token=jwt.sign({userID:user._id},"masai");
                res.send({"Mess":"Login Success","Token":token,"user":user})
            }else{
                res.send({"Mess":"Invalid Credentials"})
            }
        })
      }else{
        res.send({"Mess":"Invalid Credentials"})
      }
    } catch (error) {
        res.send({"Mess":"Invalid Credentials"})
    }
})



userRouter.patch("/update/:id",authentication,async(req,res)=>{
    const ID=req.params.id;
    try {
        let user=await userModel.findByIdAndUpdate({_id:ID},req.body);
        res.send({"mess":"User Updated"});
    } catch (error) {
        res.send({"Error":error.message});
    }
})



module.exports={userRouter} 