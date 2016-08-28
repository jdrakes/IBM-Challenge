var express = require('express');
var router = express.Router();
var _und = require('underscore');
var User = require('./userSchema');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var path = require('path');

/* GET signup page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

/* Proccess signup information. */
router.post('/signup_action', function(req, res) {
    var out;
    delete req.body.re_password;
    console.log(req.body);
    var email = req.body.email;
    var username = req.body.display;
    var validInputs = checkInputs(req.body);
    if (validInputs.error !== "") {
        res.send(validInputs);
    }

    function checkEmail(email, callback) {
        User.find({
                "email": email
            }, {
                "_id": 0,
                "email": 1
            })
            .exec(function(err, docs) {
                console.log(docs.length);
                if (typeof callback === "function") {
                    if (err) {
                        callback(err);
                    } else {
                        if (docs.length === 0) {
                            uniqueEmail = 'unique';
                            callback(null);
                        } else {
                            callback({
                                error: "Email has already been used to create an account."
                            });
                            return;
                        }
                    }
                }
            });
    }

    function checkUsername(err, callback) {
        if (err !== null) {
            callback(err);
            return;
        }

        User.find({
                "email": username
            }, {
                "_id": 0,
                "display": 1
            })
            .exec(function(err, docs) {
                console.log(docs);
                if (typeof callback === "function") {
                    if (err) {
                        console.log(err);
                        callback(err);
                        return;
                    } else {
                        if (docs.length === 0) {
                            callback(null, true);
                            return;
                        } else
                            callback({ error: "Username has already been used to create an account." });
                        return;
                    }
                }
            });
    }

    checkEmail(email, function(err) {
        checkUsername(err, function(err) {
            if (err === null) {
                addUser(req.body, function() {
                    console.log('Made it');
                });
                res.send({ error: "", redirect: '/users/user/'});
                return;
            } else {
                if (err.error !== null || err.error !== undefined) {
                    console.log(err);
                    res.statusMessage = err.error;
                    res.status(400).send({ error: 'Photo ID does not exist in photo database.' });
                }
                return;
            }
        });
    });
});

function addUser(userinfo, done) {
    var newUser = new User({
        first_name: userinfo.first_name,
        last_name: userinfo.last_name,
        display: userinfo.display,
        email: userinfo.email,
        password: userinfo.password,
        admin: false
    });

    newUser.createName(function(err, name) {
        if (err) console.log(err);
        console.log(name);
    });

    newUser.save(function(err) {
        if (err) console.log(err);
        console.log('User saved successfully!.');
        // mongoose.connection.close();
        done();
    });
}

function checkInputs(inputsObj) {
    var expectedKeys = ["first_name", "last_name", "email", "display", "password"];
    var inputs = _und.values(inputsObj);
    var keys = _und.keys(inputsObj);
    if (keys.length !== expectedKeys.length) {
        return { error: "Unexpected number of inputs submitted." };
    } else {
        for (var i = 0; i < keys.length; i++) {
            if (!_und.has(inputsObj, keys[i]))
                return { error: "Unexpected input was submitted." };
        }
    }
    if (_und.contains(inputs, "")) {
        return { error: "There were empty inputs submitted." };
    } else if (!/[\w.+-_]+@[\w.-]+.[\w]+/.test(inputsObj.email))
        return { error: "Invalid email address was submitted." };
    else if (!/^[a-z0-9]+$/i.test(inputsObj.display))
        return { error: "Invalid username was submitted." };
    else
        return { error: "" };
}
module.exports = router;
