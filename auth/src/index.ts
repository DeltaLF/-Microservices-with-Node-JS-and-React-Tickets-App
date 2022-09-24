import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import {currentUserRouter} from "./routes/current-user"
import { signinRouter } from './routes/sigin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';


const app = express()
app.use(json())

app.use(currentUserRouter)  // apply route config in current-user
app.use(signinRouter) 
app.use(signoutRouter) 
app.use(signupRouter) 


app.all('*',async (req,res,next)=>{
   throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000,()=>{
    console.log("auth server is running on port 3000")
})




