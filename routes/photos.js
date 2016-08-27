var express = require('express');
var router = express.Router();

/*return array of available photo ids*/
router.get('/ids', function(req, res) {
    var tempMap = req.db;
    var ids = tempMap.getKeys();
    if (ids === null || ids === undefined) {
        res.statusMessage = "Photo database error.";
        res.status(400).send({ error: 'Photo database not initialized.' });
    } else if (ids === 0) {
        res.statusMessage = "Photo database has no photo ids.";
        res.status(400).send({ error: 'Photo database does not contain any photo ids.' });
    } else {
        res.send(ids);
    }
});

/*return object of photo in database*/
router.get('/photo/:photoid', function(req, res) {
    var id = req.params.photoid;
    var tempMap = req.db;
    var photo = tempMap.get(id);
    if (photo === undefined || photo === null) {
        res.statusMessage = "Photo ID does not exist in the database.";
        res.status(400).send({ error: 'Photo ID does not exist in photo database.' });
    } else
        res.send(photo[0]);
});

/*return url of photo in database*/
router.get('/photo/:photoid/url', function(req, res) {
    var id = req.params.photoid;
    var tempMap = req.db;
    var photo = tempMap.get(id);
    if (photo === undefined || photo === null) {
        res.statusMessage = "Photo ID does not exist in the database.";
        res.status(400).send({ error: 'Photo ID does not exist in photo database.' });
    } else
        res.send(photo[0].url);
});

/*return url of large photo in database*/
router.get('/photo/:photoid/large', function(req, res) {
    var id = req.params.photoid;
    var tempMap = req.db;
    var photo = tempMap.get(id);
    if (photo === undefined || photo === null) {
        res.statusMessage = "Photo ID does not exist in the database.";
        res.status(400).send({ error: 'Photo ID does not exist in photo database.' });
    } else {
        if (photo[0].large)
            res.send(photo[0].large);
        else {
            res.statusMessage = "No large photo found.";
            res.status(400).send({ error: 'Photo ID does not have a large photo size.' });
        }
    }
});



module.exports = router;
