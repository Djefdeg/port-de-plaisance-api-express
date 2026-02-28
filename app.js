const express = require('express');
const app = express();
const port = 3000;

//Route de base
app.get('/',(req,res)=>{
    res.send('Hello world')
});

app.listen(port,()=>{
    console.log(`Le serveur écoute sur le port ${port}`)
});