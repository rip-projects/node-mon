exports = module.exports = function() {
    return function(req, res, next) {
        res.render(req.uri.segments[0] + '/' + req.uri.segments[1]);
    }
}