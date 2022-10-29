import mongoose from "mongoose";

/*
  We shouldn't resue the ticket model inside tickets srervice 
  because we don't need all the attributes in the ticket model from ticket service
*/

interface TicketAttrs {
    price: number;
    title: string;
}

export interface TicketDoc extends mongoose.Document{
    price: number;
    title: string;
}

interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
    price:{
        type:Number,
        required: true,
        min: 0
    },
    title:{
        type:String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    }
})

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

ticketSchema.statics.build = (attrs:TicketAttrs) => {
    return new Ticket(attrs);
}

export { Ticket };