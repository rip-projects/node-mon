var Browser = require("zombie");
var nodemailer = require("nodemailer");
var async = require('async');
var smtp = nodemailer.createTransport("SMTP", {
    host: "localhost"
});

exports = module.exports = function(app) {
    function run() {
        app.models.instances['site'].find(function(err, data) {
            async.forEach(data, function(item, cb) {
                var browser = new Browser();
                item.status = item.status || false;
                browser.visit(item.url, function (e, browser, status) {
                    if (status != 200) {
                        console.log(browser.location.href, status);
                        if (item.status) {
                            var mailOptions = {
                                from: "internal <internal@xinix.co.id>",
                                to: "reekoheek@gmail.com, avesena@gmail.com",
                                subject: "[MON] " + item.url + ' DOWN',
                                text: item.url + ' DOWN',
                                html: '<b>' + item.url + ' DOWN</b>'
                            };
                            smtp.sendMail(mailOptions, function(error, response){
                                if(error) console.log(error);
                                else console.log("Message sent: " + response.message);
                            });
                        }
                        item.status = false;
                    } else {
                        item.status = true;
                    }
                    app.models.instances['site'].save(item, cb);
                });
            }, function(err) {
                setTimeout(run, 5000);
            });
        })
    }
    run();
}