import express,{Request, Response} from "express";
import { NotAuthorizedError, NotFoundError, requireAuth } from "@tickets_dl/common";
import { Order ,OrderStatus} from "../../models/order";

const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth ,async (req:Request,res:Response)=>{
    // update the order status to cancel
    const {orderId} = req.params;
    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }
    if(order.userId !== req.currentUser.id){
        throw new NotAuthorizedError();
    }
    // const order = await Order.findByIdAndUpdate(orderId,{status: OrderStatus.Cancelled});
    order.status = OrderStatus.Cancelled;
    await order.save();
    
    // todo
    // publishing an event saying this was cancelled!


    res.status(204).send(order);
})

export {router as deleteOrderRouter};