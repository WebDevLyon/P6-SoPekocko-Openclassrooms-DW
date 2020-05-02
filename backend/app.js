const express = require('express');

const app = express();

app.use((req, res) =>{
	res.end("Requete reçue");
});

module.exports = app;