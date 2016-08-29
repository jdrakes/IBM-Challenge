var photoIds = ['28560279423', '28043088920', '28533180206', '27406821434', '27174778292'];
$(document).ready(function() {
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
