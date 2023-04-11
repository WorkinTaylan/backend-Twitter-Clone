const db=require("../../data/db-config");

async function getAllFav(){

    return await db("Favs as f")
    .leftJoin("Tweets as t", "t.Tweet_id","f.Tweet_id")
    .select("f.*","t.Content")
}

async function getById(){

    return await db("Favs").select("Favs.Fav_id")
}

async function getByFilter(filter){

    return await db("Favs as f")
    .leftJoin("Tweets as t", "f.Tweet_id","t.Tweet_id")
    .select("t.Tweet_id")
    .where(filter)
    .first()
}


async function createFav(favs){
    await db("Favs").insert({ 
        Tweet_id: favs.Tweet_id, 
        User_id: favs.User_id 
    })
    
}

module.exports={
    getAllFav,
    getById,
    createFav,
    getByFilter
}