const UserModel=require("../models/User-model")

const checkIdIsExist=async (req,res,next)=>{
    const {User_id}=req.params;

    try {
        const UsersById=await UserModel.getById(User_id)
        if(!UsersById || !UsersById.User_id){
            res.status(404).json({message:"User not found with given Id"})
        }
        else{
            req.User=UsersById
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports={
    checkIdIsExist
}