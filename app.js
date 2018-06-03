var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
require('dotenv').config();
var mongoose = require('mongoose');
var methodOverride = require('method-override');


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




app.use(methodOverride('_method'));
//meddleware
app.use(function (req, res, next) {
	// console.log(res.locals)
	if(req.query.alert === 'done'){
	// console.log(req.query)
		res.locals.message = 'successfully done';
	}else if (req.query.alert === 'create')
	{res.locals.message = 'successfully created'}
	else if (req.query.alert === 'delete')
		{res.locals.message = 'successfully deleted'}
	
  console.log('Request Type:', req.method)
  next();
})

var postRoute = require('./routes/posts');
var indexRoute = require('./routes/index');

app.use('/posts', postRoute);
app.use('/', indexRoute);
//
app.use(express.static(path.join(__dirname, 'public')));



//load view engine
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
 



app.listen(process.env.PORT, () => console.log('Example app listening on port 4000!'));
