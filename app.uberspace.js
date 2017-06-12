var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var index = require('./routes/index');
var uploads = require('./routes/uploads');

var app = express();
// var mongoURI = "mongodb://localhost:27017/images"; // replace with your mongodb url
var mongoURI = "mongodb://nan_mongoadmin:iel7eiwahB@localhost:21349/db?authSource=images"; // replace with your mongodb url


var MongoDB = mongoose.connect(mongoURI, {auth:{authdb:"admin"}}).connection;
MongoDB.on('error', function (err) {
  if (err) {
    console.log('mongodb connection error', err);
  } else {
    console.log('mongodb connection successful');
  }
});

MongoDB.once('open', function () {
  console.log('mongodb connection open');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// set up routes
app.use(express.static('public'));
app.use('/', index);
app.use('/uploads', uploads);

var server = app.listen(65435, function () {
  var port = server.address().port;
  console.log('Listening on port: ', port);
});

module.exports = app;