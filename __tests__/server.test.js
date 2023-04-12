/* const request =require("supertest");
const db=require("../data/db-config");
const server=require("../api/server");

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

test("test environment is defined as testing", ()=>{
    expect(process.env.NODE_ENV).toBe("testing");
});

 */