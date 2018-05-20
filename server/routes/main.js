const express = require("express");
var router = express.Router();
router.get('/',(req,res)=>{
    console.log(req.user)
    if (!req.user) {
        res.redirect('/auth/login');
    }
    res.render('index');
});
module.exports = router;