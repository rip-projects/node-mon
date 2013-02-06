var Controller = function(app) {
    this.app = app;
};

Controller.prototype.bind = function(uri) {
    var fnName = '';
    var method = 'all';
    var that = this;

    if (arguments.length == 2) {
        method = arguments[1];
    } else if (arguments.length > 2) {
        fnName = arguments[1];
        method = arguments[2];
    }
    if (!fnName) {
        var segments = uri.split('/');
        fnName = segments[1] || 'index';
    }

    this.app[method]('/' + uri, function() {
        that[fnName].apply(that, arguments);
    })
}

exports = module.exports = Controller;