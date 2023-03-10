const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");


const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},

});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}

const User = mongoose.model("user",userSchema);

const validate = (data)=>{
    const schema = joi.object({
        firstName:joi.string().required().label("firstName"),
        lastName:joi.string().required().label("lastName"),
        email:joi.string().email().required().label("email"),
        password:joi.string().required().label("password")
    });
    return schema.validate(data)
}

module.exports = {User,validate}