window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null ||  
    (message.source !== 'ddp-monitor-extension')) {
    return;
  }

  chrome.runtime.sendMessage(message);
});