var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
require('dotenv').config();
var mongoose = require('mongoose');


var app = express();



//Connect with mongodb
mongoose.connect('mongodb://localhost/Nodeblog');
let db = mongoose.connection;

//check connection
db.once('open', () => {
	console.log('connected to MongoDB');
});


//check for db errors
db.on('error', (err) => {
	console.log(err);
});


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());



var postRoute = require('./routes/posts');
var indexRoute = require('./routes/index');

app.use('/posts', postRoute);
app.use('/', indexRoute);


//load view engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
 



app.listen(process.env.PORT, () => console.log('Example app listening on port 4000!'));
