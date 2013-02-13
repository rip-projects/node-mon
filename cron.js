// var Browser = require("zombie");
var nodemailer = require("nodemailer");
var async = require('async');
var smtp = nodemailer.createTransport("SMTP", {
    host: "localhost"
});

var request = require('request');

// Browser.loadCSS = false;
// Browser.maxWait = '10s';

exports = module.exports = function(app) {
    function run() {
        console.log(new Date, 'starting monitor sequence...');

        app.models.instances['site'].find(function(err, data) {
            var errors = {};
            async.forEachSeries(data, function(item, cb) {
                item.status = item.status || false;

                console.log(new Date, item.url, 'start monitoring...');
                var tStart = new Date();

                var request = require('request');
                request(item.url, function (error, response, body) {
                    console.log(new Date, item.url, 'status ' + response.statusCode + ' in ' + (new Date - tStart) + 'ms');

                    if (!error && response.statusCode == 200) {
                        item.status = true;
                    } else {
                        if (item.status) {
                            var mailOptions = {
                                from: "internal <internal@xinix.co.id>",
                                to: "reekoheek@gmail.com, avesena@gmail.com",
                                subject: "[MON] " + item.url + ' DOWN (status ' + response.statusCode + ')',
                                text: item.url + ' DOWN (status ' + response.statusCode + ')',
                                html: '<b>' + item.url + ' DOWN</b> (status ' + response.statusCode + ')'

                            };
                            smtp.sendMail(mailOptions, function(error, response){
                                if(error) console.log(error);
                                else console.log("Message sent: " + response.message);
                            });
                        }
                        item.status = false;
                    }
                    app.models.instances['site'].save(item, cb);
                });
            }, function(err) {
                console.log(new Date, 'stopping monitor sequence...');
                console.log("");
                setTimeout(run, 10000);
            });
        });


    }
    run();
}