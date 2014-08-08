var selection = window.getSelection().getRangeAt(0);
var selectText = selection.extractContents();
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
span.appendChild(selectText);
selection.insertNode(span);

$.modal("<div><h1>MetaMoo</h1></div><form method='post' action='' name='metamoo-form' id='metamoo-form'></fieldset><div><label for='tag'>Tag</label><input id='tag' name='tag' type='text'></input></div><div><label for='note'>Note:</label><textarea id='note' name='note' type='text'></textarea></div><input id='submit' type='submit' value='submit'></input><input id='cancel' type='submit' value='cancel'></input></fieldset></form>", {
	containerCss:{
	backgroundColor:"#fff", 
	borderColor:"#fff", 
	height:"30%", 
	padding:0, 
	width:"40%"
	}}, {onOpen: function (dialog) {
	dialog.overlay.fadeIn('slow', function () {
		dialog.container.slideDown('slow', function () {
			dialog.data.fadeIn('slow');
			});
		});
	}});

chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.text )
	      sendResponse({farewell: "goodbye"});
	  });