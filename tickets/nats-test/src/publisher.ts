import nats from "node-nats-streaming";

// console.clear();

//  client                  clusterID, clientID
const stan = nats.connect('ticketing', 'abc',{
    url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
    console.log('Publisher connected to NATS!')

    // we can only share stream, raw data
    const data = JSON.stringify({ 
        id:'123',
        title:'concert',
        price:100
    });

    // publish(subjectname, data, cb)
    stan.publish('ticket:created',data,()=>{
        console.log("Event published!")   
    })

});