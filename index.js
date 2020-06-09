const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');

app.get('/',(req, res)=>{
    res.send('Serveur en ligne!');
});

app.post('/',express.json(),(req, res)=>{
    const agent = new dfff.WebhookClient({
        request : req,
        response : res
    });

    function information (agent){
        agent.add('Testando ficheiro');
    }

    var intentMap = new Map();
    intentMap.set('info', information);

    agent.handleRequest(intentMap);

})

app.listen(3333, ()=> console.log("Serveur sur le port 3333"));