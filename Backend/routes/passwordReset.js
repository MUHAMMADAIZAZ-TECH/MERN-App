const router = require('express').Router();
const {User} = require("../Models/user");
const Token =  require("../Models/token");
const crypto = require("crypto");
const sendEmail = require("../Utills/sendEmail");
const bcrypt = require('bcrypt');
const Joi = require('joi');

//send password link
router.post("/",async(req,res)=>{
    try {
        const emailSchema = Joi.object({email:Joi.string().email().required().label("Email")})
        const {error} = emailSchema.validate(req.body);
        if(error)
        return res.status(400).send({Message:error.details[0].message});
        let user = await User.findOne({email:req.body.email})
        if(!user)
        return res.status(409).send({Message:"User with given email does not exist!"})

        let token = await Token.findOne({userId:user._id})
        if(!token){
            token = await new Token({userId:user._id,token:crypto.randomBytes(32).toString("hex")}).save()
        }
        const url =`${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email,"password Reset",url);
        res.status(200).send({Message:"password reset link sent to your email account"})
    } catch (error) {
        res.status(500).send({Message:"Internal server error"})
    }
})
//verify url
router.get("/:id/:token",async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id})
      
        if(!user) return res.status(400).send({Message:"Invalid link"})
        const token = await Token.findOne({userId:user._id,token:req.params.token})
      
        if(!token) return res.status(500).send({Message:"Invalid link"})
       
        res.status(200).send({Message:"Valid Url"})
    } catch (error) {
        res.status(500).send({Message:"Internal server error"})
    }
})
//new password
router.post("/:id/:token",async(req,res)=>{
    try {
        const passwordSchema = Joi.object({password:Joi.string().required().label("Password")})
        const {error} = passwordSchema.validate(res.body);
        if(error)
        return res.status(400).send({Message:error.details[0].message})
        const user = await User.findOne({_id:req.params.id})
        if(!user)
        return res.status(400).send({Message:"Invalid link"})

        const token = await Token.findOne({userId:user._id,token:req.params.token})
       
        if(!token) return res.status(400).send({Message:"Invalid link" })
        
        if(!user.verified) user.verified = true;
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        user.password = hashPassword;
        
        await user.save();
        await token.deleteOne();

        res.status(200).send({Message:"Password reset successfully"})
    } catch (error) {
         res.status(500).send({
            Message:"Internal server error"
        })
    }
})
module.exports = router;