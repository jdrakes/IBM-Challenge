/*
    retrieves all photo ids from server via Flickr API
 */
function getPhotoIds(defer) {
    $.get('/photos/ids')
        .done(function(ids) {
            if (defer !== null && defer !== undefined)
                defer.resolve(ids);
            else
                return ids;
        })
        .fail(function(error) {
            errorMessage = JSON.parse(error.responseText);
            console.log(errorMessage.error);
            if (defer !== null && defer !== undefined)
                defer.resolve(null);
            else
                return null;
        });
}

/*
    retrieves photo object from photo database on server by id via Flickr API
 */
function getPhoto(photoId, defer) {
    $.get('/photos/photo/' + photoId)
        .done(function(photoObj) {
            if (defer !== null && defer !== undefined)
                defer.resolve(photoObj);
            else
                return photoObj;
        })
        .fail(function(error) {
            errorMessage = JSON.parse(error.responseText);
            console.log(errorMessage.error);
            if (defer !== null && defer !== undefined)
                defer.resolve(null);
            else
                return null;
        });
}

/*
    retrieves photo default url from photo database on server by id via Flickr API
 */
function getPhotoUrl(photoId, defer) {
    $.get('/photos/photo/' + photoId + '/url')
        .done(function(url) {
            if (defer !== null && defer !== undefined)
                defer.resolve(url);
            else
                return url;
        })
        .fail(function(error) {
            errorMessage = JSON.parse(error.responseText);
            console.log(errorMessage.error);
            if (defer !== null && defer !== undefined)
                defer.resolve(null);
            else
                return null;
        });
}

/*
    retrieves photo large url from photo database on server by id via Flickr API
 */
function getLargePhotoUrl(photoId, defer) {
    $.get('/photos/photo/' + photoId + '/large')
        .done(function(url) {
            if (defer !== null && defer !== undefined)
                defer.resolve(url);
            else
                return url;
        })
        .fail(function(error) {
            errorMessage = JSON.parse(error.responseText);
            console.log(errorMessage.error);
            if (defer !== null && defer !== undefined)
                defer.resolve(null);
            else
                return null;
        });
}
