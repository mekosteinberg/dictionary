const express = require("express");
const router = express.Router();
const dictionarySchema = require("../models/dictionary-schema.js");
const dictionarySeed = require("../models/dictionary-seed.js");
const dictionaryAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
  header: { "Access-Control-Allow_Origin": "*" },
});

//INDEX
router.get("/", (req, res) => {
  dictionarySchema.find({}, (err, allDictionaryData) => {
    res.render("index.ejs", { data: allDictionaryData });
  });
});

//DICTIONARY API
router.get("/api", (req, res) => {
  res.render("dictionary.ejs", {
    word: "Search for a word!",
    definitions: "",
    phonetic: "",
  });
});

router.get("/api/word", async (req, res, next) => {
  const word = req.query.dictionaryInput;
  const response = await axiosInstance.get(word);
  res.render("dictionary.ejs", {
    word: response.data[0].word,
    definitions: response.data[0].meanings[0].definitions,
    phonetic: response.data[0].phonetics[0].text,
  });
});

//POST
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/", (req, res) => {
  dictionarySchema.create(req.body, (err, createdDictionaryData) => {
    res.redirect("/dictionary");
  });
});

//SEED
// router.get("/seed", (req, res) => {
//   dictionarySchema.create(dictionarySeed, (err, data) => {
//     res.send(data);
//   });
// });

//SHOW
router.get("/:id", (req, res) => {
  dictionarySchema.findById(req.params.id, (err, foundData) => {
    res.render("show.ejs", { data: foundData });
  });
});

//UPDATE
router.get("/:id/edit", (req, res) => {
  dictionarySchema.findById(req.params.id, (err, foundDictionaryData) => {
    res.render("edit.ejs", { data: foundDictionaryData });
  });
});

router.put("/:id", (req, res) => {
  dictionarySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, foundData) => {
      res.redirect("/dictionary");
    }
  );
});

//DELETE
router.delete("/:id", (req, res) => {
  dictionarySchema.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/dictionary");
  });
});


module.exports = router;
