var id = 28629479145;
$(document).ready(function() {
    bindFilter('#filter', 'table');
    placeImageBackground('body',id);
});

/*
	Function to attach filter input to filter table.
 */
function bindFilter(input, table) {
    $(input).bind('keyup', function() {
        var text = new RegExp(this.value);
        $(table + ' tbody>tr').each(function() {
            if (text.test(this.innerHTML))
                $(this).show();
            else
                $(this).hide();
        });
    });
}

/*
    Function to place image to background on activities page.
 */
function placeImageBackground(domId, photoId) {
    var defer = $.Deferred();
    var url = getPhotoUrl(photoId, defer);
    defer.then(function(url) {
        $(domId).css('background-image', 'url(' + url + ')');
    });

}