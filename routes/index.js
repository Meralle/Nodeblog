var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var  app = express();

// Define the home page route
router.get('/', (req, res) => {
  res.send('this is the index route');
});

module.exports = router;
