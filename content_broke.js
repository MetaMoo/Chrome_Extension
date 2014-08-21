var selection = window.getSelection().getRangeAt(0);
var selectText = selection.extractContents();
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
span.appendChild(selectText);
selection.insertNode(span);
selectedText = '';

$.getJSON('http://metamoowebapp.herokuapp.com/ping', function(result){
		if (result.loggedIn === true){
			modalForm();
		} else {
			modalLoginPrompt();
		};
});

function modalForm(){
	console.log("Submitting form");
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
};

function modalLoginPrompt(){
	$.modal("<div><h1>MetaMoo</h1></div><h1>Please visit MetaMoo to Login</h1><p>Logged in? <a href='#'>Continue</a></div>", {
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
};

chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if (request.text )
	      sendResponse({farewell: "goodbye"});
	  	  selectedText = request;
	  });

$("#metamoo-form").submit(function(event){
	console.log(event);
	var infoSend = {};
	var today = new Date();
    var date = today.toLocaleDateString() + ' ' + today.getHours() + ':' + today.getMinutes();
	var formData = $("#metamoo-form").serializeArray();

	infoSend['content'] = selectedText.text;
	infoSend[formData[0].name] = formData[0].value;
	infoSend[formData[1].name] = formData[1].value;
	infoSend['source'] = selectedText.url;
	infoSend['date'] = date;
	console.log(infoSend);

	$.post("http://metamoowebapp.herokuapp.com/snippet", infoSend, function(data){
			console.log(data)
		}, "json");
	$.modal.close();
	event.preventDefault();
});