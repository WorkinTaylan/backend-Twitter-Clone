const db=require("../../data/db-config");

/* async function createComment(comment) {
    const newComment = {
        Comment: comment.Comment,
        Tweet_id: comment.Tweet_id,
        User_id: comment.User_id,
    };

    const [commentId] = await db("Comments").insert(newComment);

    const updatedTweetData = await db("Tweets as t")
        .leftJoin("Users as u", "t.User_id", "u.User_id")
        .leftJoin("Roles as r", "u.Role_id", "r.Role_id")
        .leftJoin("Comments as c", "t.Tweet_id", "c.Tweet_id")
        .select("t.*", "u.*", "r.*", "c.*")
        .groupBy("t.Tweet_id")
        .orderBy("t.created_at", "desc");

    const updatedTweetArr = updatedTweetData.map((tweet) => {
        const CommentArr = updatedTweetData
        .filter((comment) => comment.Tweet_id === tweet.Tweet_id)
        .map((comment) => ({
            User_id: comment.User_id,
            Avatar: comment.Avatar,
            Username: comment.Username,
            Comment: comment.Comment,
        }));

    const tweetObj = {
        Tweet_id: tweet.Tweet_id,
        User_id: tweet.User_id,
        Username: tweet.Username,
        Avatar: tweet.Avatar,
        Content: tweet.Content,
        Comments: CommentArr,
    };
        return tweetObj;
    });

    return updatedTweetArr;
}

async function Collection() {
    const tweetData = await db("Tweets as t")
        .leftJoin("Users as u", "t.User_id", "u.User_id")
        .leftJoin("Roles as r", "u.Role_id", "r.Role_id")
        .leftJoin("Comments as c", "t.Tweet_id", "c.Tweet_id")
        .select("t.*", "u.*", "r.*", "c.*")
        .groupBy("t.Tweet_id")
        .orderBy("t.created_at", "desc");

    const newTweetArr = tweetData.map((tweet) => {
        const CommentArr = tweetData
        .filter((comment) => comment.Tweet_id === tweet.Tweet_id)
        .map((comment) => ({
            User_id: comment.User_id,
            Avatar: comment.Avatar,
            Username: comment.Username,
            Comment: comment.Comment,
        }));

    const tweetObj = {
        Tweet_id: tweet.Tweet_id,
        User_id: tweet.User_id,
        Username: tweet.Username,
        Avatar: tweet.Avatar,
        Content: tweet.Content,
        Comments: CommentArr,
    };
    return tweetObj;
    });

    return newTweetArr;
}
 */
async function getallComments(){

    return await db("Comments");

}

async function getById(Comment_id){

    const Comment=db("Comments").where("Comment_id", Comment_id).first()
    return Comment;
}

async function createComment(comment){

    const newComment={
        Comment:comment.Comment,
        Tweet_id:comment.Tweet_id,
        User_id:comment.User_id,
    };
    const [Comment_id]=await db("Comments").insert(newComment);
    const createdComment=await getById(Comment_id)
    return createdComment;
} 

module.exports={
    getallComments,
    getById,
    createComment
}