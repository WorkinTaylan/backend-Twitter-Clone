const db=require("../../data/db-config");
const jwt=require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const {JWT_SEC_KEY}=require("../config/index")

async function generateToken(user){
    const payload={
        Subject:user.User_id,
        Username:user.Username,
        Rolename:user.Rolename
    }

    const secret=JWT_SEC_KEY;

    const option={
        expiresIn:"1d"
    }

    return jwt.sign(payload,secret,option)
}

async function getAllUsers(){

    return await db("Users");
}

async function getByFilter(filter){ //password alma!!
    let user= await db("Users as u")
        .leftJoin("Roles as r", "u.Role_id", "r.Role_id")
        .select("u.*", "r.Rolename")
        .where(filter).first()
    
        return user;
}

async function getById(User_id){
    return await db("Users as u").leftJoin("Roles as r","u.Role_id","r.Role_id").select("u.*","r.Rolename").where("User_id", User_id).first()
}

async function createNewUser(user){
    const User_id=uuidv4();
    const {Role_id}=await db("Roles").where("Rolename",user.Rolename).first()
    const newUser={
        User_id,
        Username:user.Username,
        Password:user.Password,
        Email:user.Email,
        Phone:user.Phone,
        Role_id:Role_id
    }
    // eslint-disable-next-line no-unused-vars
    const [insertedId]=await db("Users").insert(newUser)
    return await getByFilter({"u.Username":newUser.Username});

}

async function update(User_id,user){
    return await db("Users as u").where({User_id:User_id}).update({user})
}

async function removeUser(User_id){
    // eslint-disable-next-line no-unused-vars
    const removedUser=await db("Users").where({User_id}).del();
    return getAllUsers();
}

module.exports={
    generateToken,
    getAllUsers,
    getById,
    getByFilter,
    createNewUser,
    update,
    removeUser
}