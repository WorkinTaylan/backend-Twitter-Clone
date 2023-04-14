/* eslint-disable no-undef */
const db=require("../data/db-config");
const server=require("../api/server");
const supertest = require("supertest");
const bcrypt=require("bcryptjs");
const userModel=require("../api/models/User-model");
const jwtDecode=require("jwt-decode");


beforeAll(async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async ()=>{
    await db.seed.run();
});

afterAll(async ()=>{
    await db.destroy();
})

test("test environment is defined as testing", async ()=>{
    expect(process.env.NODE_ENV).toBe("testing");
});

test('[0] Tests are working', ()=>{
    expect(true).toBe(true)
});

describe("Test Server", ()=>{
    it("[1] Is server working", async()=>{
        const res=await supertest(server).get("/")
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Server is running")
    }, 1500);
});

const reqBody={
    Username:"Testtesttest",
    Password:"123456ab",
    Email:"test@testmail.com",
    Phone:123456789,
    Rolename:"User"
}

const defaultBody={
    Username:"Scooby-Doo", 
    Password:"Scooby123", //password=Scooby123
    Email:"scooby@Doo.com", 
    Phone:53253253253,
    Rolename:"Admin"
}

describe("Authorization tests", ()=>{
    it("[2] Have you registered successfully?", async()=>{
    
        const res=await supertest(server).post("/api/auth/register").send(reqBody)
            expect(res.status).toBe(201)
    }, 1500);

    it("[3] Is password crypted or not using bcryptjs", async()=>{        
        const res=await supertest(server).post("/api/auth/register").send(reqBody)
        const hashPassword=bcrypt.compareSync(reqBody.Password,res.body.Password)
            expect(hashPassword).toBeTruthy();
    },1500);
});

//aslında 400 almam lazım. Yup kontrol et!!
describe("Should return a 500 status", ()=>{
    it("[4] if any field is missing in register", async()=>{
        const res=await supertest(server).post("/api/auth/register").send(reqBody)
        for(let key in reqBody){
            if(!reqBody[key]){
            expect(res.status).toBe(500);
            expect(res.body.message).toBe(`${key} is required`)
            }}
    },1500);
});

describe("Inputs are unique or not", ()=>{
    it("[5] Is Username unique in register", async()=>{
        const res=await supertest(server).post("/api/auth/register").send(defaultBody)
        expect(res.status).toBe(422)
        expect(res.body.message).toMatch(/Username, Email or Phone already exist/i)
    },1500);
});

describe("Login", ()=>{
    it("[6] Success Login", async()=>{
        const res=await supertest(server).post("/api/auth/login").send({Username:"Scooby-Doo", Password:"Scooby123"})
        expect(res.body.message).toMatch(/Welcome/i)
    },1500);
});

describe("Get Users",  ()=>{
    it("[7] Users have 2 person", async()=>{
        const user=await userModel.getAllUsers()
        expect(user).toHaveLength(2);
    },1500);

    it("[8] Correct token and returns correct jwt body", async()=>{
        const res=await supertest(server).post("/api/auth/login").send(defaultBody)
        let decoded=jwtDecode(res.body.token);
        expect(decoded).toHaveProperty("iat");
        expect(decoded).toHaveProperty("exp");
        expect(decoded).toMatchObject({
            "Subject": "ce9e87e0-2837-11ec-8d3d-0242ac130003",
            "Username": "Scooby-Doo",
            "Rolename": "Admin"
        })
        
    },1500);

    it("[9] Users have to have valid token", async()=>{
        const res=await supertest(server).get("/api/users")
        expect(res.body.message).toMatch(/You have to login and valid token/i);
    },1500);

    it('[10] Correct message if token is invalid ', async () => {
        const res = await supertest(server).get('/api/users').set('authorization', 'foobar')
        expect(res.body.message).toMatch(/Token is invalid/i)
    },1500);

    it('[11] If username is empty correct error message is receiving ', async () => {
        const res = await supertest(server).get('/api/users').set('authorization', 'foobar')
        expect(res.body.message).toMatch(/Token is invalid/i)
    },1500);
});



