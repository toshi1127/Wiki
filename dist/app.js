"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Nedb = require("nedb");
const passport = require('passport');
const session = require('express-session');
const auth = require('./routes/auth');
const main = require('./routes/main');

const db = new Nedb({
    filename: path.join(__dirname, 'wiki.db'),
    autoload: true
});
let app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
}));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
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
app.listen(process.env.PORT || port, () => {
    console.log('起動しました', `http://localhost:${port}`);
    console.log('Server listening at https://' + ':' + process.env.PORT);
    console.log(process.env.IP);
});
app.use('/wiki/:wikiname', express.static(__dirname + '/public'));
app.use('/edit/:wikiname', express.static(__dirname + '/public'));
//app.use('/main',main)
app.use('/main', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    res.redirect(302, '/main');
});
// APIの定義
// Wikiデータを返すAPI 
app.get('/api/get/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname;
    //この時点でundifindなので、componentWillMountの時点でstate.nameに値が入っていない。
    db.find({ name: wikiname }, (err, docs) => {
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
app.get('/api/getting_list', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        }
        else {
            //ここで名前の配列を作ってクライアントに返す。
            docs.map((value, index, array) => {
                array[index] = value.name;
            });
            res.json({ status: true, data: docs });
        }
    });
});
app.get('/create/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname;
    db.insert([
        { name: wikiname }
    ], function (err, newDoc) {
        console.log(newDoc);
    });
});
app.get('/delete/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname;
    db.remove({ name: wikiname }, function (err, deleteDoc) {
        console.log(deleteDoc);
    });
});
app.post('/api/put/:wikiname', (req, res) => {
    const wikiname = req.params.wikiname;
    // 既存のエントリがあるか確認
    db.find({ 'name': wikiname }, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        }
        const body = req.body.body;
        if (docs.length === 0) {
            db.insert({ name: wikiname, body });
        }
        else {
            db.update({ name: wikiname }, { name: wikiname, body });
        }
        res.json({ status: true });
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map