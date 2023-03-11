const router = require("express").Router();
const {User} = require("../Models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");
router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)return res.status(400).send({Message:error.details[0].message})
            
        const user = await User.findOne({email:req.body.email})

        if(!user)return res.status(401).send({Message:"Invalid Email or Password"})
        
        const validPassword = await bcrypt.compare(req.body.password,user.password)

        if(!validPassword)return res.status(401).send({Message:"Invalid Email or Password"})

        const Token = user.generateAuthToken();
        res.status(200).send({data:Token,userData:user,Message:"Logged in successfully"})

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