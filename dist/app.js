"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Nedb = require("nedb");
const db = new Nedb({
    filename: path.join(__dirname, 'wiki.db'),
    autoload: true
});
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var port = '3000';
app.listen(process.env.PORT || port, () => {
    console.log('起動しました', `http://localhost:${port}`);
    console.log('Server listening at https://' + ':' + process.env.PORT);
    console.log(process.env.IP);
});
app.use('/wiki/:wikiname', express.static(__dirname + '/public'));
app.use('/edit/:wikiname', express.static(__dirname + '/public'));
app.use('/main', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
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