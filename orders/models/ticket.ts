import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";

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
    isReserved(): Promise<boolean>;
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

// statics: function on the schema(class)
ticketSchema.statics.build = (attrs:TicketAttrs) => {
    return new Ticket(attrs);
}

// methods: function on the instance
ticketSchema.methods.isReserved = async function() {
    // this === the ticket document taht just called 'isReserved' method
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.AwaitingPayment, 
                OrderStatus.Complete,
                OrderStatus.Created
            ]
        }
    })
    return !!existingOrder;
}


const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)


export { Ticket };