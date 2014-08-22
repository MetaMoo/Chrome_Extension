var selection = window.getSelection().getRangeAt(0);
var selectText = selection.extractContents();
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
span.appendChild(selectText);
selection.insertNode(span);
selectedText = '';

modalForm();

function modalForm(){
	$.modal("<img class='logo' src='http://metamoowebapp.herokuapp.com/images/main_logo.png'><form method='post' action='' name='metamoo-form' id='metamoo-form'><div class='form-group'><label class='form-label tag-label' for='tag'>Tag</label><input class='form-control tag' name='tag' type='text'></input></div><div class='form-group'><label class='form-label note-label' for='note'>Note</label><textarea class='form-control note' name='note' type='text'></textarea></div><button class='form-btn' value='submit' type='submit'>Submit</button><button class='form-btn cancel-btn' value='cancel'>Cancel</button></div></form>", {
	containerCss:{
		backgroundColor:"#fff", 
		borderColor:"#676767", 
		height:"40%", 
		padding:"2%", 
		width:"40%",
		right: "50px"
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

$('.cancel-btn').click(function(){
	event.preventDefault();
	$.modal.close();
	console.log("cancelling")
});

$("#metamoo-form").submit(function(event){
	event.preventDefault();
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

	$.getJSON('http://metamoowebapp.herokuapp.com/ping', function(result){
			if (result.loggedIn === true){
				$.post("http://metamoowebapp.herokuapp.com/snippet", infoSend, function(data){
				console.log(data);
			}, "json");
		} else {
			modalLoginPrompt();
		};
	});
	
	$.modal.close();
});