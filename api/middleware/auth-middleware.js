const {JWT_SEC_KEY}=process.env.JWT_SEC_KEY;
const jwt=require("jsonwebtoken");
const yup = require("yup");
const UserModel=require("../models/User-model")
const bcrypt=require("bcryptjs");


const schema=yup.object().shape({
    Username:yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 10 characters"),
    Password:yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
    Email:yup.string()
    .required("Email is required")
    .email("Email must be a valid email"),
    Phone:yup.string()
    .required("Phone number is required")
    .max(12,"Phone number should be include max 12 numbers")
})

async function restricted(req,res,next){
    try {
        const token=req.headers.authorization;
        if(token){
            jwt.verify(token, JWT_SEC_KEY, (err, decodedJWT)=>{
                if(err){
                    res.status(401).json({message:"Token geçersizdir"})
                }
                else{
                    req.decodeToken=decodedJWT
                    next()
                }
            })
        }
        else{
            res.status(401).json({message:"Token gereklidir"})
        }
    } catch (error) {
        next(error)
    }

}

async function checkPayload(req,res,next){
    try {
        const checkPayload=await schema.validate(req.body)
        if(!checkPayload){
            res.status(400).json({message:"Please check your informations"})
        }
        else{
            next()
        }
    } catch (error) {
        next(error)
    } 
}

async function checkUnique(req,res,next){
    try {
        const {Username, Email, Phone}=req.body
        let filteredUsername=await UserModel.getByFilter({Username:Username})
        let filteredEmail=await UserModel.getByFilter({Email:Email})
        let filteredPhone=await UserModel.getByFilter({Email:Phone})
        if(filteredUsername || filteredEmail || filteredPhone){
            res.status(422).json({message:"Username, Email or Phone already exist"})
        }
        else{
            next()
        }
    } catch (error) {
        next(error)
    } 
}

async function isExistUsername(req,res,next){

    try {
        const {Username}=req.body
        const isExist=await UserModel.getByFilter({Username:Username})
        if(!isExist){
            res.status(404).json({message:"Username is not exist"})
        }
        else{
            req.user=isExist;
            next();
        }
    } 
    catch (error) {
        next(error)
    }
} 

async function passwordLoginCheck(req,res,next){

    try {
        const {Password}=req.body
        let validPassword=bcrypt.compareSync(Password, req.user.Password)
        if(!validPassword){
            res.status(401).json({message:"Password is not correct"})
        }
        else{
            next();
        }
    } 
    catch (error) {
        next(error)
    }
} 


module.exports={
    restricted,
    checkPayload,
    checkUnique,
    isExistUsername,
    passwordLoginCheck

}