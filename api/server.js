const express= require("express");
const cors= require("cors");
const helmet= require("helmet");


const server =express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const authRouter=require("./router/auth-router");

server.use("/api/auth", authRouter);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});

module.exports=server;