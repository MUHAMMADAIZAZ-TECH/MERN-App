const router = require("express").Router();
const {User,validate} = require("../Models/user");
const bcrypt = require("bcrypt");
router.post("/",async(req,res)=>{
    console.log(validate(req.body))
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({
                Message:error.details[0].message
            })
        }
        const user = await User.findOne({
            email:req.body.email
        });
        if(user){
            return res.status(409).send({
                Message:"User with given email already exist"
            })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        await new User({
            ...req.body,password:hashPassword
        }).save();
       
        res.status(201).send({
            Message:"User created succesfully"
        })
    }catch(error){
        res.status(500).send({
            Message:"Internal server error"
        })

    }
})
module.exports = router;