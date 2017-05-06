'use strict';
var express = require('express');
var session = require('express-session');
var path = process.cwd();
var app = express();
require('dotenv').load();
app.use('/public', express.static(process.cwd() + '/public'));

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: true
}));

app.route('/')
	.get(function (req, res) {
		res.sendFile(path + '/public/index.html');
  });

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
