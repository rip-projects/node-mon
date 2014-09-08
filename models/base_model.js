var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbname = 'mon';
var host = 'localhost';
var port = 27017;
var db= new Db(dbname, new Server(host, port, {auto_reconnect: true}, {w: 1}));
db.open(function(){});

var Model = function(app) {
    this.app = app;
    this.db = db;
};

exports = module.exports = Model;