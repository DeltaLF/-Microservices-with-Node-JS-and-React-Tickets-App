import mongoose from "mongoose";

// data to create a ticket
interface TicketsAttrs  {
    title:string,
    price: number,
    userId: string
}

// data to create a ticket + anything will be added on ticket
interface TicketsDoc extends mongoose.Document {
    title:string,
    price: number,
    userId: string,
}

interface TicketModel extends mongoose.Model<TicketsDoc>{
    build(attrs: TicketsAttrs): TicketsDoc;
}

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },price:{
        type:Number,
        required: true
    },userId:{
        type:String,
        required: true
    }
}, 
{toJSON: {
    transform(doc, ret){
        ret.id = ret._id;
        delete ret._id;
    }}
})



ticketSchema.statics.build = (attrs: TicketsAttrs) => {
    return new Ticket(attrs)
}


const Ticket = mongoose.model<TicketsDoc, TicketModel>('Ticket', ticketSchema);

export {Ticket}