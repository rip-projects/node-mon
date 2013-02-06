var util = require('util');
var BaseController = require('./base_controller');
var mongo = require('mongodb');

var Controller = function(app) {
    BaseController.apply(this, arguments);

    this.bind('site/index');
    this.bind('site/listing');
    this.bind('site/add');
    this.bind('site/edit/:id');
    this.bind('site/remove/:id');
};

util.inherits(Controller, BaseController);

Controller.prototype.index = function(req, res, next) {
    next();
};

Controller.prototype.listing = function(req, res, next) {
    this.app.models.instances['site'].find(function(err, data) {
        if (err) {
            return next(err);
        }
        res.locals.data = {
            items: data
        };
        next();
    });
};

Controller.prototype.add = function(req, res, next) {
    if (req.method != 'POST') {
        return next();
    }

    this.app.models.instances['site'].save(req.body, function(err, data) {
        res.redirect('site/listing');
    });
};

Controller.prototype.edit = function(req, res, next) {
    if (req.method != 'POST') {
        this.app.models.instances['site'].findOne({_id: mongo.ObjectID(req.params.id)}, function(err, data) {
            if (err) return next(err);

            res.locals.data = data;
            next();
        });
        return;
    }

    req.body._id = mongo.ObjectID(req.params.id);
    this.app.models.instances['site'].save(req.body, function(err, data) {
        res.redirect('site/listing');
    });
};

Controller.prototype.remove = function(req, res, next) {
    this.app.models.instances['site'].remove({_id: mongo.ObjectID(req.params.id)}, function(err, data) {
        res.redirect('site/listing');
    });
};

exports = module.exports = Controller;