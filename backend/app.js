const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require('path');

//Import des routes
const userRoutes = require("./route/user");
const sauceRoutes = require('./route/sauce');

//Connection à la base de donnée MongoDB
mongoose
  .connect(
    "mongodb+srv://wdl69:Wdl69120@cluster0-lltka.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Création d'application express
const app = express();

//Header pour contourner erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Rendre la requete exploitable
app.use(bodyParser.json());

//Gestion de la ressource image de façon statique
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes attendues
app.use("/api/auth", userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;
