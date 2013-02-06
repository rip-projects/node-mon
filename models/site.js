var util = require('util');
var BaseModel = require('./base_model');

var Model = function(app) {
    BaseModel.apply(this, arguments);
};

util.inherits(Model, BaseModel);

Model.prototype.find = function(cb) {
    this.db.collection('site', function(err, collection) {
        if (err) return cb(err);
        collection.find().toArray(cb);
    });
}

Model.prototype.findOne = function(data, cb) {
    this.db.collection('site', function(err, collection) {
        if (err) return cb(err);
        console.log(data);
        collection.findOne(data, cb);
    });
}

Model.prototype.save = function(data, cb) {
    this.db.collection('site', function(err, collection) {
        if (err) return cb(err);
        collection.save(data, cb);
        // if (data._id) {
        //     var criteria = {
        //         _id: data._id
        //     };
        //     delete data._id;
        //     console.log(criteria);
        //     console.log(data);
        //     collection.update(criteria, data, cb);
        // } else {
        // }
    });
};

Model.prototype.remove = function(data, cb) {
    this.db.collection('site', function(err, collection) {
        if (err) return cb(err);

        if (data._id) {
            return collection.remove(data, cb);
        } else {
            cb(new Error('No data'));
        }
    });
}

exports = module.exports = Model;