var photoIds = ['28560279423', '28043088920', '28533180206', '27406821434', '27174778292'];
var backgroundId = '26829267114';
$(document).ready(function() {
	placeImageBackground('body',backgroundId);
    for (id in photoIds) {
        placeImage(id, photoIds[id]);
    }
});

/*
	Function to place images on home page.
 */
function placeImage(index, photoId) {
    var defer = $.Deferred();
    var url = getPhotoUrl(photoId, defer);
    defer.then(function(url) {
        $('#img' + index).attr('src', url);
    });

}


/*
    Function to place image to background on home page.
 */
function placeImageBackground(domId, photoId) {
    var defer = $.Deferred();
    var url = getPhotoUrl(photoId, defer);
    defer.then(function(url) {
        $(domId).css('background-image', 'url(' + url + ')');
    });

}