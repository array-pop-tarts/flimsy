/**
 * Author: Barbara Goss
 * Created: 2017-03-12
 */

let express = require('express');
let app = express();

require('dotenv').config();

let webpack = require('webpack');
let webpackMiddleware = require('webpack-dev-middleware');

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SERVER);

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let setUpAuth = require('./auth');
setUpAuth(app);

app.use(webpackMiddleware(webpack(require('./webpack.config'))));

app.use(express.static('public'));

app.use('/api/users', require('./api/users'));
app.use('/api/films', require('./api/films'));
app.use('/api/screenings', require('./api/screenings'));
app.use('/api/venues', require('./api/venues'));
app.use('/api/friends', require('./api/friends'));

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.listen(process.env.PORT || 8080);