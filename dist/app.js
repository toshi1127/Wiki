"use strict";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var Nedb = require("nedb");
var passport = require('passport');
var session = require('express-session');
var auth = require('./routes/auth');
var main = require('./routes/main');

var db = new Nedb({
    filename: path.join(__dirname, 'wiki.db'),
    autoload: true
});
var app = express();
app.get('/', function (req, res) {
    console.log("aiueo");
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        res.redirect(302, '/main');
    }
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());
// Routing
app.use('/auth', auth);
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
var port = '8080';
app.listen(process.env.PORT || port, function () {
    console.log('起動しました', "http://localhost:" + port);
    console.log('Server listening at https://' + ':' + process.env.PORT);
    console.log(process.env.IP);
});
app.use('/wiki/:wikiname', express.static(__dirname + '/public'));
app.use('/edit/:wikiname', express.static(__dirname + '/public'));
//app.use('/main',main)
app.use('/main/:name', express.static(__dirname + '/public'));
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname', function (req, res) {
    var wikiname = req.params.wikiname;
    //この時点でundifindなので、componentWillMountの時点でstate.nameに値が入っていない。
    db.find({ name: wikiname }, function (err, docs) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        }
        if (docs.length === 0) {
            docs = [{ name: wikiname, body: '' }];
        }
        res.json({ status: true, data: docs[0] });
    });
});
app.get('/api/getting_list', function (req, res) {
    db.find({}, function (err, docs) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        } else {
            //ここで名前の配列を作ってクライアントに返す。
            docs.map(function (value, index, array) {
                array[index] = value.name;
            });
            res.json({ status: true, data: docs });
        }
    });
});
app.get('/create/:wikiname/:name', function (req, res) {
    var wikiname = req.params.wikiname;
    var name = req.params["name"];
    db.insert([{
        name: wikiname,
        user: name
    }], function (err, newDoc) {
        console.log(newDoc);
    });
});
app.get('/delete/:wikiname', function (req, res) {
    var wikiname = req.params.wikiname;
    db.remove({ name: wikiname }, function (err, deleteDoc) {
        console.log(deleteDoc);
    });
});
app.post('/api/put/:wikiname/:name', function (req, res) {
    var wikiname = req.params.wikiname;
    var user = req.params["name"];
    // 既存のエントリがあるか確認
    db.find({ 'name': wikiname, 'user': user }, function (err, docs) {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        }
        var body = req.body.body;
        console.log(body);
        console.log(wikiname);
        console.log(user);
        db.update({ name: wikiname, user: user }, { name: wikiname, user: user, body: body });

        res.json({ status: true });
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map