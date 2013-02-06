exports = module.exports = function() {
    return function(req, res, next) {
        var segments = req.originalUrl.split('/').slice(1);
        req.uri = {
            segments: segments,
            string: segments.join('/')
        };
        next();
    }
}