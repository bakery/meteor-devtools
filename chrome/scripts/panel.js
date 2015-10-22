var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('/scripts/inject.js'), false);
xhr.send();

chrome.devtools.inspectedWindow.eval(xhr.responseText);