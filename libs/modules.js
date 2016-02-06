var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/firefoxos');

var portfolioCollection = db.get('portfolio');
var stockCollection = db.get('stock');

var enableCORS = function (req, res, next) {
    
    res.header('Access-Control-Allow-Origin', 'http://folhainvest.folha.uol.com.br');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET');
	res.header('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.header('Access-Control-Max-Age', '1000');

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

var app = express();
app.use(enableCORS);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var	server = http.createServer(app);
var _ = require('underscore');

module.exports = {
  express: express,
  app: app,
  server: server,
  _: _,
  portfolioCollection: portfolioCollection,
  stockCollection: stockCollection
}
