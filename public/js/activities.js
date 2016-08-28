$(document).ready(function() {
	bindFilter('#filter', 'table');
});

/*
	Function to attach filter input to filter table.
 */
function bindFilter(input, table){
	$(input).bind('keyup', function(){
		var text = new RegExp(this.value);
		$(table+' tbody>tr').each(function(){
			if(text.test(this.innerHTML))
				$(this).show();
			else
				$(this).hide();
		});
	});
}