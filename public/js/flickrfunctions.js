    $.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId + '&format=json&nojsoncallback=1')
        .done(function(photos) {
            if (defer !== null && defer !== undefined)
                defer.resolve(photos.photos.photo);
            else
                return photos.photos.photo;
        })
        .fail(function(data) {
            // console.log(data);
            // console.log('Error');
            return null;
        });
}

function getPhoto(photo, defer) {
    var urlDefault = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    // console.log(photo);
    $('#photoHolder').append('<img src="' + urlDefault + '">');
    return urlDefault;
}

function getPhotoSize(apiKey, photo, defer) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + apiKey + '&photo_id=' + photo.id + '&format=json&nojsoncallback=1';
    $.get(url)
        .done(function(sizes) {
            sizes = sizes.sizes.size;
            // console.log(sizes);
            if (defer !== null && defer !== undefined)
                defer.resolve(sizes);
            else
                return sizes;
        })
        .fail(function() {
            // console.log(data);
            // console.log('Error');
            if (defer !== null && defer !== undefined)
                defer.resolve(null);
            else
                return null;
        });
}

function hasLargePhoto(apiKey, photo, defer) {
    var deferSize = $.Deferred();
    var result = null;
    getPhotoSize(apiKey, photo, deferSize);
    
    deferSize.then(function(sizes) {
        if (sizes !== null && sizes !== undefined) {
            for (size in sizes) {
                if (sizes[size].label !== 'Large')
                    continue;
                else if (sizes[size].label === 'Large') {
                    // console.log(sizes[size]);
                    result = sizes[size];
                }
            }
        }
        if (defer !== null && defer !== undefined)
                defer.resolve(result.source);
            else
                return result.source;
    });
}
