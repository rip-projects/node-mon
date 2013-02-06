var fs = require('fs');

exports = module.exports = function(app) {
    this.instances = {};

    var files = fs.readdirSync('./models');
    for(var i in files) {
        var f = files[i].split('.');

        if (files[i] != 'index.js' && f[1] == 'js' && !f[0].match(/_model$/)) {
            var Model = require('./' + f[0]);
            this.instances[f[0]] = new Model(app);
        }
    }
    app.models = this;
};