var fs = require('fs');

exports = module.exports = function(app) {
    this.instances = {};

    var files = fs.readdirSync('./controllers');
    for(var i in files) {
        var f = files[i].split('.');

        if (files[i] != 'index.js' && f[1] == 'js' && !f[0].match(/_controller$/)) {
            var Controller = require('./' + f[0]);
            this.instances[f[0]] = new Controller(app);
        }
    }
    app.controllers = this;
};