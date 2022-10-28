import mongoose from "mongoose";

// to make sure all the services share the same status 
// Orders, Expiration, Payments
// enum Status {pending = 'pending', finish = 'finish', failed:'failed'}

// properties required to create an Order
interface OrderAttrs{
    userId: string;
    status: string; 
    expiresAt: Date;
    ticket: TicketDoc; // instance of Ticket
}

// all properties an Order has
interface OrderDoc extends mongoose.Document{
    userId: string;
    status: string; 
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
        required: true
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