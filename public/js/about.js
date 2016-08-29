var photoId = '27271870395';
$(document).ready(function() {
    placeImage(0, photoId);
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
