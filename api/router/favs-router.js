const router = require("express").Router();
const FavModel=require("../models/Favs-model");
const twModel=require("../models/Tweets-model");
const {favIsExist}=require("../middleware/favs-middleware");


router.get('/:User_id', async (req, res, next) => {
    try {
      const { User_id } = req.params;
      const favs = await FavModel.getFavsByUser(User_id);
      res.status(200).json(favs);
    } catch (error) {
      next(error);
    }
  });

router.get("/", async(req,res,next)=>{
    try {
        const allFavs=await FavModel.getAllFav()
        res.status(200).json(allFavs)
    } catch (error) {
        next(error)
    }
})


router.post("/", favIsExist, async(req,res,next)=>{
    const inserted=await twModel.getById(req.body.Tweet_id);
    const Content=await inserted.Content;
    try{
        const newFav={
            Tweet_id:req.body.Tweet_id,
            User_id:req.body.User_id
        
        }
        await FavModel.createFav(newFav);
        
        res.status(201).json(Content) // message ve contenti aynı anda alamadım
    } 
    catch (error) {
    next(error);
}
});

module.exports=router;