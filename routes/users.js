var express = require('express');
var router = express.Router();
var User = require('./userSchema');
var path = require('path');

/* GET users listing. */
router.get('/user/:userid', authenticated, function(req, res, next) {
    console.log(req.session);
    var id = req.params.userid;
    console.log(id);
    console.log(req.session.userid);
    if (id !== req.session.userid){
        res.redirect('/');
        return;
    }
    User.findById(id, function(err, user) {
        if (err) {
            console.log("err");
            return;
        }
        console.log(user);
        if(!user){
            res.redirect('/');
            return;
        }
        
        res.sendFile(path.join(__dirname, '../public/user.html'));
    });
});


function authenticated(req, res, next) {
    console.log(req.session);
    if (req.session.userid !== undefined && req.session.userid !== null) {
        return next();
    }
    res.redirect('/');
}
module.exports = router;
