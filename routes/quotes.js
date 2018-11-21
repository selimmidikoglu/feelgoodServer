const express = require ('express');
const router = express.Router ();
const mongoose = require ('mongoose');
const fs = require ('fs');

let rawdata = fs.readFileSync ('../quotes.json');
let quotes = JSON.parse (rawdata);
let rawdata1 = fs.readFileSync ('../keywords.json');
let keywords = JSON.parse (rawdata1);
//there will be only one http method which is get method decided by keyword.js
router.get ('/:keyword', (req, res, next) => {
  const keyword = req.params.keyword;
  const arr = keywords[`${keyword}`];
  const randomer = Math.floor(Math.random() * arr.length);
  const quote  = quotes[arr[randomer]];

  res.status (200).json ({
    author: quote.author,
    quote: quote.quote,
    id: quote.id
  });
});
router.get ('/', (req, res, next) => {
  res.status (200).json ({
    message: 'nice root',
  });
});
module.exports = router;
