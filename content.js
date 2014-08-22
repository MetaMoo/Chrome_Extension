var selection = window.getSelection().getRangeAt(0);
var selectText = selection.extractContents();
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
span.appendChild(selectText);
selection.insertNode(span);
selectedText = '';

modalForm();

function modalForm(){
	$.modal("<img class='logo' src='http://metamoowebapp.herokuapp.com/images/main_logo.png'><form method='post' action='' name='metamoo-form' id='metamoo-form'><div class='form-group'><label class='form-label tag-label' for='tag'>Tag</label><input class='form-control tag' name='tag' type='text'></input></div><div class='form-group form-group-note'><label class='form-label note-label' for='note'>Note</label><textarea class='form-control note' name='note' type='text'></textarea></div><div class='buttons'><button class='form-btn' value='submit' type='submit'>Submit</button><button class='form-btn cancel-btn' value='cancel'>Cancel</button></div></form><p class='warning-text'>Please make sure you are logged into <a href='http://metamoowebapp.herokuapp.com/login' target='_blank'>MetaMoo</a></p>", {
	containerCss:{
		backgroundColor:"#fff", 
		borderColor:"#676767",
		borderWidth: "1px",
		borderStyle: "solid", 
		height:"43%", 
		padding:"1%", 
		width:"40%",
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
	$.modal("<div class='login-warning'><img class='warning-logo' src='http://metamoowebapp.herokuapp.com/images/main_logo.png'><h3 class='warning-paragraph'>Unfortunately, we can't submit your data unless you are logged into MetaMoo.</h3><p>Log in <a class='login-link' href='http://metamoowebapp.herokuapp.com/login' target='_blank'>here</a>.</div>", {
	containerCss:{
		backgroundColor:"#fff", 
		borderColor:"#676767",
		borderWidth: "1px",
		borderStyle: "solid", 
		height:"43%", 
		padding:"1%", 
		width:"40%",
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