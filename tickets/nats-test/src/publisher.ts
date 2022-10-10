import nats from "node-nats-streaming";

// also can be called client, which is the instance of nats
const stan = nats.connect('ticketing', 'abc',{
    url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
    console.log('Publisger connected to NATS')
});