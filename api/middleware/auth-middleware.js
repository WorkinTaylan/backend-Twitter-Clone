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
        let token=req.headers.authorization;
        if(token){
            jwt.verify(token,process.env.JWT_SEC_KEY, (err, decodeToken)=>{
                if(err){
                    res.status(401).json({message:"Token is invalid"})
                }
                else{
                    req.decodedToken=decodeToken
                    next()
                }
            })
        }
        else{
            res.status(401).json({message:"You have to have token"})
        }
    } catch (error) {
        next(error)
    }

}

async function checkRegisterPayload(req,res,next){
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
        let filteredUsername=await UserModel.getByFilter({Username:Username,Email:Email,Phone:Phone })
    
        if(filteredUsername){
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

async function checkLoginPayload(req,res,next){
    try {
        const {Username, Password}=req.body;
        if(!Username || !Password){
            next({status:404, message:"Please check your informations"})
        }
        else{
            next()
        }
    } catch (error) {
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
    checkRegisterPayload,
    checkUnique,
    isExistUsername,
    checkLoginPayload,
    passwordLoginCheck

}