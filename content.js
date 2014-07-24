
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    console.log(sender);
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

