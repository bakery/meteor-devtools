var compactJSONString = function(data, maxLength){
  var str = JSON.stringify(data);
  if(str.length <= maxLength){
    return str;
  } else { 
    var postFix = ' ... }';
    return [str.substr(0,maxLength - postFix.length),
      postFix].join('');
  }
};


var runSetup = function(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL('/scripts/agent.js'), false);
  xhr.send();
  var script = xhr.responseText;

  // inject into inspectedWindow
  chrome.devtools.inspectedWindow.eval(script);

  // Create a connection to the background page
  var backgroundPageConnection = chrome.runtime.connect({
    name: 'panel'
  });

  backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
  });

  backgroundPageConnection.onMessage.addListener(function(msg) {
    var messages = _.isArray(msg.data) ? msg.data : [msg.data];

    _.each(messages, function(message){
      var message = _.isString(message) ? JSON.parse(message) : message;
      var dataContext = _.extend({}, message, {
        jsonString : JSON.stringify(message, null, ' '),
        compactJSONString : compactJSONString(message, 50),
        isOutbound : function(){
          return msg.eventType === 'sent';
        },
        isInbound : function(){
          return msg.eventType === 'received';
        },
        itemClass : msg.eventType === 'sent' ? 'outbound' : 'inbound'
      }); 

      var newItem = $(Mustache.to_html($("#message-template").html(), dataContext));
      newItem.find('.toggle-request-body').click(function(){
        $(this).parent().next('pre').toggleClass('expand');  
        $(this).toggleClass('fa-plus-square-o fa-minus-square-o');
      });

      $('ul').append(newItem);
    });

    if($(window).scrollTop()/$(document).height() > 0.8){
      // XX: if it looks like we are at the bottom of the list
      // keep scrolling to the very bottom as new message arrive
      $(window).scrollTop($(document).height());
    }
  });

  (function resetUI(){
    $('ul').children().remove();
  })();  
};

chrome.devtools.network.onNavigated.addListener(function(){
  runSetup();
});

runSetup();