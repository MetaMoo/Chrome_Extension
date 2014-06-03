Metamoo Chrome Extension:

Current state:
The extension is available through both background script and content script. We mainly want to focus on content script and the background script should eventually be removed. The only aspect of the background script that should be kept (and might only be available through background scripting) is the instantiation of the context menu item.

Future steps:
* Confirm script architecture. Make sure information flows from background.js to content.js. Test the removal of background in manifest.
* Build out popup drawer on context menu select. Popup should contain field for tag and dropdown to select project. Popup should be written in content.js.
* Create data flow logic using Google Drive and Spreadsheet API. Data flow probably needs to behave like description below:
	- select item with context menu -> create tag and select project in popup -> store info in variable -> use Google auth to confirm user (have user log in if not already) -> access user's drive with Drive API and find id of Metamoo spreadsheet (should be in format metamoodb/metamoodb) -> use Spreadsheet API protocol to post selected text as line item in metamoo spreadsheet (confirm it's being written to appropriate project worksheet)

Resources:
Here are the sites that I think will be useful to accomplish the above:
* https://developer.chrome.com/extensions/overview - general chrome extension information
* https://developer.chrome.com/extensions/content_scripts - this is how we are accessing the DOM and creating our drawer
* https://developer.chrome.com/extensions/tabs#method-sendMessage - send message may be required to send selection information to content script
* https://developers.google.com/google-apps/spreadsheets - Google spreadsheets API, has some info on Auth as well
* https://developers.google.com/google-apps/spreadsheets/#adding_a_list_row - Specifically entry on adding row to spreadsheet
* https://developers.google.com/google-apps/spreadsheets/?csw=1#spreadsheets_api_urls_visibilities_and_projections - Another reference for adding spreadsheet rows.
* https://developers.google.com/drive/v2/reference/ - Google Drive API reference
* https://developers.google.com/drive/v2/reference/files/list - list drive files, needed to find metamoodb ID
* https://developer.chrome.com/extensions/samples - Extension samples. Good for random references

Notes:
* I think the ugly part will be dealing with authentication. Might need to dig deep to get that one working.
* Tweaks on the Google Apps script need to made to work with the above dataflow
* jQuery is currently running through the content_scripts manifest log. Able to be used in content.js