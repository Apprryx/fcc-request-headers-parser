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
app.route('/api/whoami')
	.get(function (req, res) {
		var obj = {ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, language: req.headers["accept-language"].split(',')[0].trim(), software: req.headers['user-agent'].split(/[\(\)]/)[1].trim()};
		res.json(obj);
  });

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
