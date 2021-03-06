// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Tag to MetaMoo";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
 
});
 
// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
 
// The onClicked callback function.
function onClickHandler(info, tab) {
    chrome.tabs.executeScript(null, { file: "jquery-1.11.1.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "jquery.simplemodal.1.4.4.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "content.js" }, function(){
       chrome.tabs.insertCSS(null, { file: "modalstyles.css"}, function(){
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {text: info.selectionText, url : info.pageUrl}, function(response) {
               console.log(response.farewell);
          });
         });
       });
      }); // End of content execute script
    }); // End of modal execute script
  }); // End of jquery execute script
}; // End of onClick Handler