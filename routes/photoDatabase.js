var request = require('request');
var rp = require('request-promise');
var state = {
    photoMap: null
}

/*Initialize photo database if database exists do nothing*/
exports.pullPhotos = function(apiKey, userId, done) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1';
    var photos;
    if (state.photoMap) {
        console.log(state.photoMap);
        console.log('exists');
        return done(null, true);
    }

    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body); //convery JSON string into JSON object
            if (body.stat === 'fail') { //check to see if flickr request failed
                error = body.message;
                return done(error, null);
            }

            /*On successful API call parse results and store in Map for web app use*/
            photos = body.photos.photo;
            if (photos != null) {
                state.photoMap = new Map();
                for (p in photos) {
                    var photo = photos[p];
                    var id = photo.id;
                    var defaultURL = getPhotoUrl(photo);
                    photo.url = defaultURL;
                    photo.large = null;
                    state.photoMap.set(id, photo);
                    getLarge(apiKey, photo);
                }
                return done(null, true);
            }
        } else {
            return done(error, null);
        }
    });
}

/*return photo databse if null database is not intialized*/
exports.getPhotoDb = function() {
    return state.photoMap;
}

/*Construct default url from photo object*/
function getPhotoUrl(photo, defer) {
    var urlDefault = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    return urlDefault;
}

/*Grab sizes for photo object and if large option exsists add it to photoMap*/
function getLarge(apiKey, photo) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body); //convery JSON string into JSON object
            if (body.stat === 'fail') { //check to see if flickr request failed
                error = body.message;
                console.log('Get Large:');
                console.log(error);
                return;
            }

            /*On successful API call parse results and store in MAp for web app use*/
            sizes = body.sizes.size;
            if (sizes !== null && sizes !== undefined) {
                var photoObj = state.photoMap.get(photo.id)[0];
                for (size in sizes) {
                    if (sizes[size].label !== 'Large')
                        continue;
                    else if (sizes[size].label === 'Large') {
                        photoObj.large = sizes[size].source;
                        return;
                    }
                }
            }
        } else {
            console.log(error);
        }
        return;
    });
}

/**
 * Create a Map Object
 */
function Map() {
    "use strict";
    this.keys = [];
    this.data = {};

    this.set = function(key, value) {
        if (this.data[key] === null || this.data[key] === undefined) {
            this.keys.push(key);
            this.data[key] = [];
        }
        this.data[key].push(value);
    };
    this.get = function(key) {
        if (this.data[key] === undefined || this.data[key] === null)
            return null;
        return this.data[key];
    };
    this.size = function() {
        return this.keys.length;
    };
    this.isEmpty = function() {
        return this.keys.length === 0;
    };
    this.getKeys = function() {
        return this.keys;
    };
    this.remove = function(key) {
        for (k in this.keys) {
            if (key === this.keys[k]) {
                this.keys.splice(k, 1);
                delete this.data[key];
            }
        }
    };
    this.clear = function() {
        for (var index in this.keys) {
            delete this.data[this.keys[index]];
        }
        this.keys.length = 0;
    };
    this.has = function(key) {
        return this.data.hasOwnProperty(key);
    };
    this.toString = function() {
        var temp = "";
        for (var i = 0; i < this.keys.length; i++) {
            temp = temp + "\n" + this.keys[i] + ": " + this.data[this.keys[i]];
        }
        return temp;
    };
}
