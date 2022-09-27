import mongoose from 'mongoose'
import {app} from "./app"

const start = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined')
    }
    // the connection is actually across pod 
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017')
        console.log("Connected to Mongodb")
    } catch (err){
        console.error(err)
    }
    app.listen(3000,()=>{
        console.log("auth server is running on port 3000!")
    })   
   
}

start();



