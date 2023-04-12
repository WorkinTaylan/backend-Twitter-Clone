function checkCommentPayload(req, res, next) {
    const checkParameters = ["Comment", "User_id", "Tweet_id"];

    checkParameters.forEach((item) => {
        req.body[item] ? null : res.status(400).json({ message: `Check ${item}` }) && next();
    });
    next();
}
module.exports={
    checkCommentPayload
}