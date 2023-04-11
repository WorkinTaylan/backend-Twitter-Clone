const favModel=require("../models/Favs-model");

const favIsExist=async (req,res,next)=>{


        try {
            const {Tweet_id}=req.body;
            const isExist=await favModel.getByFilter({ "f.Tweet_id": Tweet_id })
            if(isExist){
                res.status(422).json({message:"This fav is already exist"})
            }
            else{
                next()
            }
        } 
        catch (error) {
            next(error)
        }
    } 

module.exports={
    favIsExist
}
