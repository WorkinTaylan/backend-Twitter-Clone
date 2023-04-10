const express= require("express");
const cors= require("cors");
const helmet= require("helmet");


const server =express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// eslint-disable-next-line no-unused-vars
server.use("/", (req,res,next)=>{
    res.send("<h2>ÇALIŞIYOR</h2>")
})

module.exports=server;