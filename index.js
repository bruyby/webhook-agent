const express = require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const axios = require('axios');

const port = 3333;

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

    function  ApiExternoDemo(agent){
        const word = agent.parameters.palavras;
              agent.add('Intente foi chamado : '+ word);
        return axios.get(`https://api.datamuse.com/words?rel_rhy=${word}`)
        .then((result) => {
            result.data.map(wordObj => {
                agent.add(wordObj.word);
            });
        });
        
      }

    var intentMap = new Map();
    intentMap.set('info', information);
    intentMap.set('ApiExternoDemo', ApiExternoDemo);

    agent.handleRequest(intentMap);

})

app.listen(port, ()=> console.log("Serveur sur le port port"));