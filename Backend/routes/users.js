const router = require("express").Router();
const {User,validate} = require("../Models/user");
const bcrypt = require("bcrypt");
const Token = require("../Models/token");
const sendEmail = require("../Utills/sendEmail");
const crypto = require("crypto");

router.post("/",async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({
                Message:error.details[0].message
            })
        }
        let user = await User.findOne({
            email:req.body.email
        });
        if(user){
            return res.status(409).send({
                Message:"User with given email already exist"
            })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        user = await new User({
            ...req.body,password:hashPassword
        }).save();

        const token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save()
       
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email,"verify Email",url);
        res.status(201).send({
            Message:"An Email Sent to your account please verify"
        })
    }catch(error){
        res.status(500).send({
            Message:"Internal server error"
        })

    }
})

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ Message: "Invalid link" });

		const token = await Token.findOne({userId: user._id,token: req.params.token,});
		if (!token) return res.status(400).send({ Message: "Invalid link" });

		await user.updateOne({ _id: user._id, verified: true });
        await token.deleteOne();
       
        res.status(200).send({ Message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ Message: "Internal Server Error" });
	}
});
module.exports = router;