import {Message} from "node-nats-streaming";
import { Listener,NotFoundError,OrderCreatedEvent, Subjects } from "@tickets_dl/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../models/tickets";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject:Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);
        // error if ticket not found
        if(!ticket){
            throw new NotFoundError();
        }
        // mark the ticket as being reserved by setting its orderId property
        ticket.set({orderId: data.id});
        // save the ticket
        await ticket.save();
        // ack the message
        msg.ack();
    }
    
}