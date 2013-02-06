var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('layout', 'layout');
    app.use(expressLayouts);
    app.use(express.basicAuth('admin', 'dwarf'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(require('./middleware/uri')());
    app.use(app.router);
    app.use(require('./middleware/view_handler')());
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/', function(req, res){
    res.redirect('site/index');
});

new require('./controllers')(app);
new require('./models')(app);

new require('./cron')(app);

app.listen(3000);