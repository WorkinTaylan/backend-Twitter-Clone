const router=require("express").Router();
const twModel=require("../models/Tweets-model")
const tweetMw=require("../middleware/twitter-middleware");
//const UserModel=require("../models/User-model");

router.get("/",  async(req,res,next)=>{
    
    try {
        const allTweets=await twModel.getAllTweets()
        res.status(200).json(allTweets)
    } catch (error) {
        next(error)
    } 
        
});

router.get("/:Tweet_id",tweetMw.checkIdIsExist,async(req,res,next)=>{
    
    try {
        const responseBody=await req.Tweet
        res.status(200).json(responseBody)
    } catch (error) {
        next(error)
    } 
        
});

router.post("/",tweetMw.checkUserIdIsExist, tweetMw.checkTweetPayload,async(req,res,next)=>{

    try{
        const newTweet={
            Content:req.body.Content,
            User_id:req.body.User_id
        }
        const inserted= await twModel.createNewTweet(newTweet)
        res.status(201).json(inserted) 
    } 
    catch (error) {
    next(error);
}
});

router.put("/:Tweet_id",tweetMw.checkIdIsExist ,tweetMw.checkTweetPayload,async(req,res,next)=>{

    try{
        const newTweet={
            Content:req.body.Content,
            User_id:req.body.User_id
        }
        const inserted= await twModel.updateTweet(req.params.Tweet_id,newTweet)
        res.status(201).json(inserted) 
    } 
    catch (error) {
    next(error);
}
});

router.delete("/:Tweet_id", tweetMw.checkIdIsExist,async(req,res,next)=>{

    try{
        await twModel.deleteById(req.params.Tweet_id)
        res.status(200).json({message:`Deleted tweet ${req.params.Tweet_id}`}) 
    } 
    catch (error) {
    next(error);
}
});



/*

router.get("id")

router.post()


router.put()

router.delete() */


module.exports=router;