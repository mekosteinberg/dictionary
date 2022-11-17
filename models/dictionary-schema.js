const express = require("express");
const mongoose = require("mongoose");

const dictionarySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    definition: { type: String, required: true },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dictionary", dictionarySchema);
