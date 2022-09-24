import {Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/custom-error"

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction)=>{

    if(err instanceof CustomError){ // for all CustomError
        return res.status(err.statusCode).send({ errors: err.serializeErrors()})
    }

    // general error
    res.status(400).send({
        erros:[{ message:'something went wrong' }]
})
}