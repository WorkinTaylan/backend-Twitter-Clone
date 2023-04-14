require("dotenv").config();

module.exports={
    JWT_SEC_KEY:process.env.JWT_SEC_KEY || "shh"
}