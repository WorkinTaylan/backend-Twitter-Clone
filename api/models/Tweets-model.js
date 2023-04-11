const db=require("../../data/db-config");
const { v4: uuidv4 } = require("uuid");


const getAllTweets=async ()=>{

    const allTweets=await db("Tweets as t").leftJoin("Users as u", "t.User_id","u.User_id").select("t.Content","t.created_at","t.User_id","u.Username","u.Avatar")
    return allTweets
};

const getByFilter=async(filter)=>{
    const filteredTweet=db("Tweets as t")
    .join("Users as u","t.User_id","u.User_id")
    .select("u.Username","u.User_id","u.Avatar","t.Content","t.created_at")
    .where("t.Tweet_id",filter)
    .first()

    return filteredTweet;
}

async function getById(Tweet_id){
    return await db("Tweets").where("Tweet_id",Tweet_id).first()
}

async function createNewTweet(tweet){
    tweet.Tweet_id=uuidv4();
    await db("Tweets").insert(tweet)
    return getById(tweet.Tweet_id)
}


module.exports={
    getAllTweets,
    getByFilter,
    getById,
    createNewTweet
}