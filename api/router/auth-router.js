const router =require("express").Router();
const mw=require("../middleware/auth-middleware");
const UserModel=require("../models/User-model");
const bcrypt=require("bcryptjs");

router.post("/register", mw.checkRegisterPayload,mw.checkUnique, async (req,res,next)=>{
    try {
        const inserted=await UserModel.createNewUser({
            Username:req.body.Username,
            Password:bcrypt.hashSync(req.body.Password, 8),
            Email:req.body.Email,
            Phone:req.body.Phone,
            Rolename:req.body.Rolename
        })
        res.status(201).json({message:"You have registered successfully",user:inserted})
    } catch (error) {
        next(error)
    }
})

router.post("/login", mw.checkLoginPayload, mw.isExistUsername,mw.passwordLoginCheck, async (req,res,next)=>{
    try {
        const token=await UserModel.generateToken(req.user)
        res.status(200).json({
            message:`Welcome back ${req.user.Username}`,
            token:token
        })
        
    } catch (error) {
        next(error)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
      // remove the token from the headers object
    delete req.headers.authorization;

    res.status(200).json({
        message: "You have been logged out successfully",
    });
    } catch (error) {
    next(error);
    }
});

module.exports=router;