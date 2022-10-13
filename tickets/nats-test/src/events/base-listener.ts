import {Message, Stan} from "node-nats-streaming";

export default abstract class Listener{
    abstract subject: string;
    abstract queueGroupName: string; // cannot be initialized
    abstract onMessage(data:any,msg:Message): void;
    private client:Stan;
    protected ackWait = 5*1000;      // can have inital value


    constructor(client:Stan){
        this.client = client;
    }

    subscriptionOptions(){
        return this.client.subscriptionOptions()
          .setDeliverAllAvailable()
          .setManualAckMode(true)
          .setAckWait(this.ackWait)
          .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject, 
            this.queueGroupName,
            this.subscriptionOptions()
        );
        subscription.on('message',(msg:Message)=>{
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );
            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        })
    }

    parseMessage(msg:Message){
        const data = msg.getData();
        return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
    }

}
