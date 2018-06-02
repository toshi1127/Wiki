'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _wikidata = require('./models/wikidata');

var _wikidata2 = _interopRequireDefault(_wikidata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('./routes/auth');
var url = "mongodb://heroku_qq1252mp:1qg8n9f2fsslseanuomigsu7vt@ds129670.mlab.com:29670/heroku_qq1252mp";
var start = true;

_mongoose2.default.connect(url, function (err, db) {
    if (err) {
        console.log('ERROR connecting to: ' + url + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + url);
    }
});
var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

var WikiModele = new _wikidata2.default();
WikiModele.practice = [];
WikiModele.history = [];
WikiModele.Operation = [];
WikiModele.inspection = [];
WikiModele.rule = [];
WikiModele.save(function (err) {
    if (err) {
        console.log(err);
    }
});
//const WikiModele = WikiList

var app = (0, _express2.default)();
app.get('/', function (req, res) {
    if (!req.session) {
        res.redirect('/auth/login');
    } else {
        res.redirect(302, '/main');
    }
});
app.use((0, _expressSession2.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: _mongoose2.default.connection }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
// Routing
app.use('/auth', auth);
// Serve static files
app.use(_bodyParser2.default.urlencoded({ extended: true }));
var port = '8080';
app.listen(process.env.PORT || port, function () {
    console.log('起動しました', 'http://localhost:' + port);
    console.log('Server listening at https://' + ':' + process.env.PORT);
    console.log(process.env.IP);
});
app.use('/wiki/:wikiname/:selectValue', _express2.default.static(__dirname + '/public'));
app.use('/edit/:wikiname/:selectValue', _express2.default.static(__dirname + '/public'));
app.use('/main/:name', _express2.default.static(__dirname + '/public'));
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname/:selectValue', function (req, res) {
    var wikiname = req.params.wikiname;
    var selectValue = req.params.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    var docs = {
                        name: wikiname,
                        body: Schema[0][selectValue][x].body,
                        user: Schema[0][selectValue][x].user
                    };
                    res.json({ status: true, data: docs });
                }
            }
        }
    });
});

app.get('/api/comment/:wikiname/:selectValue', function (req, res) {
    var wikiname = req.params.wikiname;
    var selectValue = req.params.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            return;
        } else {
            return new Promise(function (resolve, reject) {
                for (var x = 0; x < Schema[0][selectValue].length; x++) {
                    if (Schema[0][selectValue][x].name == wikiname) {
                        var commentList = Schema[0][selectValue][x].commentList;
                        res.json({ status: true, commentList: commentList });
                    }
                }
            }).then(function () {
                return;
            });
        }
    });
});

app.get('/api/getting_list/:selectValue', function (req, res) {
    var selectValue = req.params.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            if (Schema[0][selectValue].length !== 0) {
                Schema[0][selectValue].map(function (value, index, array) {
                    array[index] = value.name;
                });
                res.json({ status: true, data: Schema[0][selectValue] });
            } else {
                res.json({ status: true, data: Schema[0][selectValue] });
            }
        }
    });
});

app.post('/create', function (req, res) {
    var wikiname = req.body.wikiname;
    var user = req.body.name;
    var selectValue = req.body.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        return new Promise(function (resolve, reject) {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    res.json({ status: false, msg: err });
                    return;
                }
            }
            resolve(wikiname);
        }).then(function (wikiname) {
            var element = {
                name: wikiname,
                user: user
            };
            Schema[0][selectValue].push(element);
            Schema[0].save(function (err) {
                res.json({ status: true });
            });
        });
    });
});

app.post('/delete', function (req, res) {
    var wikiname = req.body.wikiname;
    var selectValue = req.body.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    Schema[0][selectValue].splice(x, 1);
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    });
});

app.post('/api/put/:wikiname', function (req, res) {
    var wikiname = req.params.wikiname;
    var user = req.body.user;
    var selectValue = req.body.selectValue;
    var body = req.body.body;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    Schema[0][selectValue][x].body = body;
                    Schema[0][selectValue][x].user = user;
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    });
});

app.post('/api/putComment/:wikiname', function (req, res) {
    var wikiname = req.params.wikiname;
    var name = req.body.user;
    var comment = req.body.comment;
    var selectValue = req.body.selectValue;
    var wikilist = _mongoose2.default.model('WikiList');

    wikilist.find({}, function (err, Schema) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            for (var x = 0; x < Schema[0][selectValue].length; x++) {
                if (Schema[0][selectValue][x].name == wikiname) {
                    var element = {
                        user: name,
                        body: comment
                    };
                    Schema[0][selectValue][x].commentList.push(element);
                    Schema[0].save(function (err) {
                        res.json({ status: true });
                    });
                }
            }
        }
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map