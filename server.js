const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const mongoURI = "mongodb://localhost:27017/dictionary";
const methodOverride = require("method-override");
const dictionaryRouter = require("./routes/dictionary-routes.js");
const axios = require("axios");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//router
app.use("/dictionary", dictionaryRouter);

app.listen(3000, () => console.log("Listening..."));
mongoose.connect(mongoURI, () => {
  console.log("Databse is connected");
});
