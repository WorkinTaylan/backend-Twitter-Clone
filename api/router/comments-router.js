const router = require("express").Router();
const commentModel=require("../models/Comments-model")
const commentMw=require("../middleware/comments-middleware")

router.get("/", async(req,res,next)=>{

    try{
        const allComments=await commentModel.getallComments();
        res.status(200).json(allComments);
    }
    catch (error){
        next(error)
    }
})

router.post("/", commentMw.checkCommentPayload,async(req,res,next)=>{

    try {
        const comment=await commentModel.createComment(req.body)
        res.status(201).json(comment)
    } catch (error) {
        next(error)
    }

})

module.exports=router;