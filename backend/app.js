const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

//Import du modele de la sauce
const Sauce = require("./model/Sauce");

//Import des routes
const userRoutes = require("./route/user");

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

//Création d'une sauce
app.post("/api/sauces", auth, (req, res, next) => {
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then((sauce) => {
      res.status(201).json({ sauce });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

//Récupère une sauce unique par l'id
app.get("/api/sauces/:id", auth, (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

//Récupération de toutes les sauces
app.get("/api/sauces", auth, (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

//Routes attendues
app.use("/api/auth", userRoutes);

module.exports = app;
