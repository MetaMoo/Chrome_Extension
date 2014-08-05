chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {

	    if (request.text )
	      sendResponse({farewell: "goodbye"});
	  });


    var selection = window.getSelection().getRangeAt(0);
	var selectText = selection.extractContents();
	var span = document.createElement("span");
	span.style.backgroundColor = "yellow";
	span.appendChild(selectText);
	selection.insertNode(span);