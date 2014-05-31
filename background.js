// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
    var selectionText = info.selectionText;
    console.log(selectionText);
  };

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var selection = "selection";
  var title = "Tag to MetaMoo";
  var id = chrome.contextMenus.create({"title": title, "contexts":[selection],"id": "context" + selection});
});

