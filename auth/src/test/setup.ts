import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest"
import {app} from "../app";

// so beforeAll and afterAll can share the mongo variable
var mongo: any;

// tell TS that there will be a function inside global scope
declare global {
    namespace NodeJS{
        interface Global{
            signin(): Promise<string[]>;
        }
    }
}

beforeAll( async () => {
    process.env.JWT_KEY = 'randomValue';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri,{})
});

beforeEach( async()=>{
        // cleanup when closd
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({});
    }

});

afterAll(async ()=>{
    await new Promise<void>(resolve=>{
        // give more time for test then close the mongoose connection
        setTimeout(async ()=>{
            if(mongo){
                await mongo.stop();
            }
            await mongoose.connection.close();
            resolve()
        },10000)
    })

},15000);

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'test';

    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email, password
      })
      .expect(201);
    const cookie = response.get('Set-Cookie');

    return cookie;
};
