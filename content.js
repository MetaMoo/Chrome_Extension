var selection = window.getSelection().getRangeAt(0);
var selectText = selection.extractContents();
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
span.appendChild(selectText);
selection.insertNode(span);
selectedText = '';

modalForm();

function modalForm(){
	$.modal("<a id='metamoo-link' href='http://metamoowebapp.herokuapp.com'><img id='metamoo-logo' src='http://metamoowebapp.herokuapp.com/images/main_logo.png'></a><form method='post' action='' name='metamoo-form' id='metamoo-form'><div class='metamoo-form-group'><label id='metamoo-form-label' for='tag'>Tag</label><input id='metamoo-form-control' name='tag' type='text'></input></div><div id='metamoo-form-group-note'><label id='metamoo-form-label' for='note'>Note</label><textarea id='metamoo-note' name='note' type='text'></textarea></div><div id='metamoo-buttons'><button id='metamoo-form-btn' value='submit' type='submit'>Submit</button><button id='metamoo-form-btn' value='cancel'>Cancel</button></div></form><p id='metamoo-warning-text'>Please make sure you are logged into <a id='metamoo-link' href='http://metamoowebapp.herokuapp.com/login' target='_blank'>MetaMoo</a></p><p id='metamoo-warning-text'>Hit ESC to close the window.</p>", {
	containerCss:{
		backgroundColor:"#fff", 
		borderColor:"#676767",
		borderWidth: "1px",
		borderStyle: "solid", 
		height:"400px", 
		padding:"1%", 
		width:"300px",
		left: "60%",
		top: "50px"
	}}, {onOpen: function (dialog) {
	dialog.overlay.fadeIn('slow', function () {
		dialog.container.slideDown('slow', function () {
			dialog.data.fadeIn('slow');
			});
		});
	}});
};

function modalLoginPrompt(){
	$.modal("<div id='metamoo-login-warning'><img id='meatmoo-warning-logo' src='http://metamoowebapp.herokuapp.com/images/main_logo.png'><h3 id='metamoo-warning-paragraph'>Unfortunately, we can't submit your data unless you are logged into MetaMoo.</h3><p id='metamoo-login-text'>Log in <a id='metamoo-login-link' href='http://metamoowebapp.herokuapp.com/login' target='_blank'>here</a>.</div>", {
	containerCss:{
		backgroundColor:"#fff", 
		borderColor:"#676767",
		borderWidth: "1px",
		borderStyle: "solid", 
		height:"400px", 
		padding:"1%", 
		width:"300px",
		left: "60%",
		top: "50px"
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

$('#metamoo-form').on('click', '.login-link', function(){
	$.modal.close();
	console.log("click the link")
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