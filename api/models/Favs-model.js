const db=require("../../data/db-config");

async function getAllFav(){

    return await db("Favs as f")
    .leftJoin("Tweets as t", "t.Tweet_id","f.Tweet_id")
    .select("f.*","t.Content")
}

async function getById(User_id){

    return await db("Favs").select().where("User_id",User_id)
}


async function getFavsByUser(userId) {
    return await db("Favs")
        .join("Tweets", "Favs.Tweet_id", "Tweets.Tweet_id")
        .select("Favs.Fav_id", "Tweets.Content")
        .where("Favs.User_id", userId);
}

async function getByFilter(filter){

    return await db("Favs as f")
    .leftJoin("Tweets as t", "f.Tweet_id","t.Tweet_id")
    .select("f.Fav_id","t.Content")
    .where("Fav_id",filter)
    .first()
}
async function checkByTweet_id(filter){

    return await db("Favs as f")
    .leftJoin("Tweets as t", "f.Tweet_id","t.Tweet_id")
    .select("f.Fav_id","t.Content")
    .where("t.Tweet_id",filter)
    .first()
}


async function createFav(favs){
    const [Fav_id]=await db("Favs").insert({ 
        Tweet_id: favs.Tweet_id, 
        User_id: favs.User_id 
    })

    return getByFilter(Fav_id);
    
}
const deleteById=async (Fav_id)=>{
    return await db("Favs").where("Fav_id",Fav_id).del()
}

module.exports={
    getAllFav,
    getById,
    createFav,
    checkByTweet_id,
    getByFilter,
    getFavsByUser,
    deleteById
}