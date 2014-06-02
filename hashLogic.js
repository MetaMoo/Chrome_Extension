$(document).ready(function(){
	$('input:radio[name="project"]').change(
		function(){
			console.log(this.val());
		});
});