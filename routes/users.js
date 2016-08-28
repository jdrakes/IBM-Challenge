var express = require('express');
var router = express.Router();
var User = require('./userSchema');
var path = require('path');

/*Get if user is logged in*/
router.get('/loggedin', function(req, res, next) {
    console.log(req.session.userid);
    if (req.session === undefined || req.session === null) {
        res.status(400).send({ username: null });
    } else if (req.session.userid === undefined || req.session.userid === null) {
        res.status(400).send({ username: null });
    } else {
        res.send({ username: req.session.displayname });
    }
});

/* GET users listing. */
router.get('/user/:displayname', authenticated, function(req, res, next) {
    console.log(req.session);
    var displayname = req.params.displayname;
    console.log(displayname);
    console.log(req.session.displayname);
    if (req.session === undefined || req.session === null) {
        res.redirect('/');
        return;
    } else if (req.session.userid === undefined || req.session.userid === null || req.session.displayname === undefined || req.session.displayname === null) {
        res.redirect('/');
        return;
    }

    var id = req.session.userid;
    User.findOne({"display": displayname}, function(err, user) {
        if (err) {
            console.log("err");
            return;
        }
        console.log(user);
        if (!user) {
            if (displayname !== req.session.displayname) {
                res.redirect('/');
                return;
            } else {
                req.session = null;
                res.redirect('/');
                return;
            }
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
