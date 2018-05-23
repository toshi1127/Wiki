'use strict';

var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    res.render('index');
});
module.exports = router;