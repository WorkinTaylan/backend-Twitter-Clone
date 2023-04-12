const twModel=require("../models/Tweets-model");
const UserModel=require("../models/User-model");

const checkUserIdIsExist=async (req,res,next)=>{
    const {User_id}=req.body;

    try {
        const UsersById=await UserModel.getById(User_id)
        if(!UsersById || !UsersById.User_id){
            res.status(404).json({message:"User not found with given Id"})
        }
        else{
            
            next()
        }
    } catch (error) {
        next(error)
    }
}

const checkIdIsExist=async (req,res,next)=>{
    const {Tweet_id}=req.params;

    try {
        const TweetsById=await twModel.getById(Tweet_id)
        if(!TweetsById || !TweetsById.Tweet_id){
            res.status(404).json({message:"Tweet not found with given Id"})
        }
        else{
            req.Tweet=TweetsById
            next()
        }
    } catch (error) {
        next(error)
    }
}

async function checkTweetPayload(req,res,next){
    try {
        const {Content}=req.body;
        if(!Content){
            next({status:404, message:"Please write something to tweet"})
        }
        else{
            next()
        }
    } catch (error) {
        next(error)
    } 
}

module.exports={
    checkUserIdIsExist,
    checkIdIsExist,
    checkTweetPayload
}