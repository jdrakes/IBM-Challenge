var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
/* GET about us page. */
router.get('/about', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});
/* GET contact us page. */
router.get('/contact', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});
/* GET activities page. */
router.get('/activities', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/activities.html'));
});

// /* GET activities page. */
// router.get('/display', function(req, res, next) {
//     res.sendFile(path.join(__dirname, '../public/displayAll.html'));
// });


module.exports = router;
