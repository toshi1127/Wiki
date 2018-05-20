"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Nedb = require("nedb");
const passport = require('passport');
const session = require('express-session');
const auth = require('./routes/auth');
const main = require('./routes/main');
var MongoClient = require("mongodb").MongoClient;

// 接続文字列
var url = "mongodb://localhost:8080/HuacWiki";

// MongoDB へ 接続
MongoClient.connect(url, (error, db) => {
   // 接続メッセージを表示
   console.log("MongoDB へ 接続中...")
});


const db = new Nedb({
    filename: path.join(__dirname, 'wiki.db'),
    autoload: true
});
let app = express();
app.get('/', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {
        res.redirect(302, '/main');
    }
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
    },
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
app.listen(process.env.PORT || port, () => {
    console.log('起動しました', `http://localhost:${port}`);
    console.log('Server listening at https://' + ':' + process.env.PORT);
    console.log(process.env.IP);
});
app.use('/wiki/:wikiname', express.static(__dirname + '/public'));
app.use('/edit/:wikiname', express.static(__dirname + '/public'));
//app.use('/main',main)
app.use('/main/:name', express.static(__dirname + '/public'));
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
app.get('/create/:wikiname/:name', (req, res) => {
    const wikiname = req.params.wikiname;
    const name = req.params["name"]
    db.insert([
        {
            name: wikiname,
            user: name
        }
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
app.post('/api/put/:wikiname/:name', (req, res) => {
    const wikiname = req.params.wikiname;
    const user = req.params["name"]
    // 既存のエントリがあるか確認
    db.find({ 'name': wikiname, 'user': user }, (err, docs) => {
        if (err) {
            res.json({ status: false, msg: err });
            return;
        }
        const body = req.body.body;
        db.update({ name: wikiname, user: user }, { name: wikiname, user: user, body });

        res.json({ status: true });
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map