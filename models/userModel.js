const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    img:String,
    name: String,
    email: String,
    password: String,
    bio:String,
    phone:String
})

const userModel=mongoose.model("userCollection",userSchema);

module.exports={userModel};