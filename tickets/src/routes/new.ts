import express, {Request,Response} from 'express';
import {requireAuth, validateRequest } from '@tickets_dl/common';
import {body} from "express-validator";


const router = express.Router();

router.post('/api/tickets',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is requried'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greater then zero'),
    validateRequest
], (req:Request,res:Response)=>{
    console.log("req.body", req.body)
    res.sendStatus(200); 
});

export {router as createTicketRouter};