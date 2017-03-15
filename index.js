/**
 *
 * Author: Barbara Goss
 * Created: 2017-03-12
 */
var express = require('express');
var app = express();

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

app.use(webpackMiddleware(webpack(require('./webpack.config'))));

app.use(express.static('public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/flimsy');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/api/films', require('./api/films'));
app.use('/api/users', require('./api/users'));
app.use('/api/venues', require('./api/venues'));

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(8080);