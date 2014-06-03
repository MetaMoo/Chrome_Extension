$(document).ready(function(){
	//This is all testing junk. Right now it just adds the word RED to every site someone visits. Need to tweak so that it only activates when the context menu is selected.
	console.log("OMG SO MUCH RED!");

	$("body").append("<h1>RED</h1>");
	  // chrome.tabs.executeScript({
	  //   code: 'document.body.style.backgroundColor="red"'
	  // });

});