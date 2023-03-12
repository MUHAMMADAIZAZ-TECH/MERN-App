const router = require("express").Router();
const {User} = require("../Models/user");
const Token = require("../Models/token");
const crypto = require("crypto");
const sendEmail = require("../Utills/sendEmail");
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)return res.status(400).send({Message:error.details[0].message})
            
        const user = await User.findOne({email:req.body.email})

        if(!user)return res.status(401).send({Message:"Invalid Email "})
        
        const validPassword = await bcrypt.compare(req.body.password,user.password)

        if(!validPassword)return res.status(401).send({Message:"Invalid Password"})
        if(!user.verified){
            let token = await Token.findOne({
                userId:user._id
            })
            if(!token){
                const token = await new Token({userId:user._id,token:crypto.randomBytes(32).toString("hex")}).save()
                const url = `${process.env.BASE_URL}users/${user._id}/verify${token.token}`;
                await sendEmail(user.email,"verify Email",url);

            }
            return res.status(400).send({Message:"An Email is sent to your account please verify"})
        }
        const token = user.generateAuthToken();
        res.status(200).send({data:token,userData:user,Message:"Logged in successfully"})

    }catch(error){
        res.status(500).send({Message:"Internal server error"
        })
    }
})

const validate = (data)=>{
    const schema = joi.object({
        email:joi.string().email().required().label("email"),
        password:joi.string().required().label("password")
    })
    return schema.validate(data);
}
module.exports = router;