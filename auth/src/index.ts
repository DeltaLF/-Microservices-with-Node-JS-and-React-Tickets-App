import express from 'express';
import {json} from 'body-parser';

const app = express()
app.use(json())

app.get('/api/users/currentuser',(req,res)=>{
    res.send('Hi currentUser')
})

app.listen(3000,()=>{
    console.log("auth server is running on port 3000")
})




