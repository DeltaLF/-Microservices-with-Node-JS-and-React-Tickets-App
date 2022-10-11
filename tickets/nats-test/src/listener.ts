import nats,{Message} from "node-nats-streaming";
import { randomBytes } from "crypto";

// console.clear();

//  client                  clusterID, clientID
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log("Listener connected to NATS!");

    stan.on('close', ()=>{
        console.log("NATS listener connection closed!")
        process.exit();
    });

    const options = stan.subscriptionOptions()
      .setManualAckMode(true);  // anknowledge mode (queue only confrim the event is correctly processed after receive ack)
    // queue distributes event to only one of listener to prevent duplicated handling 
    const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group', options); 

    subscription.on('message', (msg:Message)=>{ 
        const data = msg.getData();
        if( typeof data === 'string'){
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
        }
        msg.ack();
    });
});


// close before intercepted or terminated
process.on('SIGNINT', () => stan.close()); // intercept 
process.on('SIGTERM',() => stan.close());  // terminate 