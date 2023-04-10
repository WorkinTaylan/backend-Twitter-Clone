const router =require("express").Router();
const mw=require("../middleware/auth-middleware");
const UserModel=require("../models/User-model");
const bcrypt=require("bcryptjs");

router.post("/register", mw.checkPayload,mw.checkUnique, async (req,res,next)=>{
    try {
        const inserted=await UserModel.createNewUser({
            Username:req.body.Username,
            Password:bcrypt.hashSync(req.body.Password, 8),
            Email:req.body.Email,
            Phone:req.body.Phone,
            Rolename:req.body.Rolename
        })
        res.status(201).json({message:"You have registered",user:inserted})
    } catch (error) {
        next(error)
    }
})


module.exports=router;