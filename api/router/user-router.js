const router=require("express").Router();
const userModel=require("../models/User-model");
const userMw=require("../middleware/user-middleware")

router.get("/",  async(req,res,next)=>{
    
    try {
        const allUsers=await userModel.getAllUsers()
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    } 
        
})

router.get("/:User_id",userMw.checkIdIsExist, async(req,res,next)=>{
    
    
    
    try {
        const responseBody=await req.User
        res.status(200).json(responseBody)
    } catch (error) {
        next(error)
    } 
        
})




module.exports=router;