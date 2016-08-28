var express = require('express');
var router = express.Router();
var _und = require('underscore');
var User = require('./userSchema');

/* GET users listing. */
router.post('/login_action', function(req, res) {
    console.log(req.body);
    username = req.body.username;
    password = req.body.password;
    console.log(username, password);
    // process.nextTick(function() {
    console.log("I made it");
    var inputValid = checkInputs(username);
    console.log(inputValid);
    if (inputValid.error !== "") {
        console.log(inputValid);
        return done(null, false);
    }
    User.findOne({
        "email": username
    }, function(err, user) {
        if (err) {
            console.log("err");
            // return done(err);
        }
        console.log("user is" + user);
        if (!user) {
            console.log("!user");
            // return done(null, false);
        }
        if (user === undefined || user === null || user.length === 0) {
            // return done(null, false);
        }
        var id = user._id;
        if (user.password != password || user.email != username) {
            console.log("wrong password, got " + password + ", expected " + user.password);
            // return done(null, false);
        }
        console.log("success?");
        req.session.userid = id;
        res.redirect('/users/user/' + id);

    });

});

function checkInputs(username) {
    console.log('checking inputs');
    if (!/[\w.+-_]+@[\w.-]+.[\w]+/.test(username))
        return { error: "Invalid username was submitted." };
    else
        return { error: "" };
}

module.exports = router;
