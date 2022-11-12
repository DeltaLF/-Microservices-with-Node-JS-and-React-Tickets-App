import { OrderStatus } from "@tickets_dl/common";
import mongoose from "mongoose";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

interface OrderAttrs { 
    // build an order
    id: string;
    status: OrderStatus;
    version:number;
    userId: string;
    price: number;
}

interface OrderDoc extends mongoose.Document{ // Document contains id
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        required: true
    }
}, {
    toJSON:{
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status,
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };