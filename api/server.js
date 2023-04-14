const express= require("express");
const cors= require("cors");
const helmet= require("helmet");


const server =express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter=require("./router/auth-router");
const userRouter=require("./router/user-router");
const tweetsRouter=require("./router/tweets-router");
const favsRouter=require("./router/favs-router");
const commentsRouter=require("./router/comments-router");
const mw=require("./middleware/auth-middleware")

server.use("/api/auth", authRouter)
server.use("/api/users", mw.restricted, userRouter)
server.use("/api/tweets", mw.restricted, tweetsRouter)
server.use("/api/favs", mw.restricted, favsRouter)
server.use("/api/comments", mw.restricted, commentsRouter)

server.get("/", (req,res)=>{
    res.status(200).json({message:"Server is running"})
});

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});

module.exports=server;