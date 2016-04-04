var connections = {};

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    }
  } 
  return true;
});

chrome.runtime.onConnect.addListener(function(port) {
  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(function(request) {
    // Register initial connection
    if (request.name === 'init') {
      connections[request.tabId] = port;

      port.onDisconnect.addListener(function() {
        delete connections[request.tabId];
      });

      return;
    }
  });

});

chrome.tabs.onRemoved.addListener(function (tabId) {
  if (connections[tabId]) {
    delete connections[tabId];
  }
});