import {ValidationError} from "express-validator"
import { CustomError } from "./custom-error"

export class RequestValidationError extends CustomError{
    statusCode = 400
    constructor(public errors: ValidationError[]){ 
        // add private will make erros a private property automatically
        super('Invalid request parameters')

        // only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    serializeErrors(){
        // create a standard format so FE can exepct what data to be recevied
        return this.errors.map(error=>{
            return {message: error.msg, field: error.param}
        })
      
    }
    
}
