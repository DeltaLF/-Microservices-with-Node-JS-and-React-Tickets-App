import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError{
    reason = 'Error connecting to database'
    statusCode = 500
    constructor(){ 
        super('Error connecting to db')
        // only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
    
    serializeErrors(){
                // 400 not approprate bc user sent the correct data
        // 500 for server error
        return [{message: this.reason}]
    }
}
