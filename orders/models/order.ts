import mongoose from "mongoose";
import { OrderStatus } from "@tickets_dl/common";
import { TicketDoc } from "./ticket";

// to make sure all the services share the same status 
// Orders, Expiration, Payments
// enum Status {pending = 'pending', finish = 'finish', failed:'failed'}

// properties required to create an Order
interface OrderAttrs{
    userId: string;
    status: OrderStatus; 
    expiresAt: Date;
    ticket: TicketDoc; // instance of Ticket
}

// all properties an Order has
interface OrderDoc extends mongoose.Document{
    userId: string;
    status: OrderStatus; 
    expiresAt: Date;
    ticket: TicketDoc; // instance of Ticket
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created // default value
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date 
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
},{ // options
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.statics.build = (attrs:OrderAttrs) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc,OrderModel>('Order', orderSchema);

export {Order};