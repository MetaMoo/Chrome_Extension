// The onClicked callback function.
function onClickHandler(info, tab) {
	//Stored text selected by context menu into variable. Process should be moved to content script.
    var selectionText = info.selectionText;
    console.log(selectionText);
    //This executes the content script, but so does the manifest. One of these have to go.
  	chrome.tabs.executeScript(null, {file: "content.js"});
  	
  };

//On context menu click run the above function
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var selection = "selection";
  var title = "Tag to MetaMoo";
  //Create context menu. Context menu only appears on selection of text.
  var id = chrome.contextMenus.create({"title": title, "contexts":[selection],"id": "context" + selection});
});