import { PaymentCreatedEvent, Publisher, Subjects } from "@tickets_dl/common";

export class PaymentCreatedPubliser extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

}