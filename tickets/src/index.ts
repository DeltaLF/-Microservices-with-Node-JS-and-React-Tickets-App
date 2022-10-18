import mongoose from 'mongoose'
import {app} from "./app"
import { natsWrapper } from './nats-wrapper';

const start = async()=>{

    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    // the connection is actually across pod 
    try{
        // ticketing came from nats.depl.yaml arg cid
        await natsWrapper.connect('ticketing', 'thisisrnadomstring', 'http://nats-srv:4222');
        natsWrapper.client.on('close', () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on('SIGINT',()=>natsWrapper.client.close());
        process.on('SIGTERM',()=>natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongodb")
    } catch (err){
        console.error(err)
    }

    app.listen(3000,()=>{
        console.log("auth server is running on port 3000!")
    })   
   
}

start();



