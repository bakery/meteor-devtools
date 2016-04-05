import Highlighter from './highlighter';

var hl;

const __getBlazeData = (callback) => {
  if (typeof Blaze === 'undefined') {
    return;
  }

  var idCnt = 0;

  var generateId = function(){
    idCnt++;
    return 'node-' + idCnt;
  };

  var cleanupData = function(data){
    if(!data){
      return data;
    }

    var d = {};
    var keys =  Object.getOwnPropertyNames(data);

    for(var i=0; i<keys.length; i++) {
      var serializedFieldData = null; 

      try {
        JSON.stringify(data[keys[i]])
      } catch(e) {
        serializedFieldData = data[keys[i]].toString();
      }

      d[keys[i]] = serializedFieldData || data[keys[i]];
    }

    return d;
  };

  var getViewFromEl = function(el) {
    var view = Blaze.getView(el);
    var events = [];
    var _events = (view && view.template && view.template.__eventMaps) || [];

    for(var i=0; i<_events.length; i++) {
      var props = Object.getOwnPropertyNames(_events[i]);
      if (props.length !== 0) {
        events.push(props[0]);
      }
    }

    return (view && {
      name: view.name,
      data: cleanupData(view.templateInstance && view.templateInstance().data),
      helpers: Object.getOwnPropertyNames(
        (view.template && view.template.__helpers) || {}
      ),
      events: events
    });
  };

  var lookForViews = function(el, parent){
    var view = getViewFromEl(el);

    if (view && view.name !== parent.name) {
      var _id = generateId();
      var node = {
        _id: _id,
        name: view.name,
        data: view.data,
        helpers: view.helpers,
        events: view.events,
        children: []
      };
      el.setAttribute('data-blaze-inspector-id', _id);

      for(var i=0; i<el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType !== 1) {
          continue;
        }
        lookForViews(el.childNodes[i], node);
      }

      parent.children.push(node);
    } else {
      for(var i=0; i<el.childNodes.length; i++) {
        if (el.childNodes[i].nodeType !== 1) {
          continue;
        }
        lookForViews(el.childNodes[i], parent);
      }
    }
  };

  var data = {
    _id: generateId(),
    name: 'body',
    children: []
  };

  lookForViews(document.querySelector('body'), data);
  
  callback && callback('blaze-tree', JSON.stringify(data));
};

let __talkToExtension = null;

module.exports = {
  setup: (talkToExtension) => {
    __talkToExtension = talkToExtension;
    // XX: wait a little bit to make sure all the jazz
    // has been rendered
    setTimeout(() => __getBlazeData(talkToExtension), 2000);
  },

  onMessage: (message) => {
    if(message.source !== 'blaze-inspector'){
      return;
    }
    
    switch(message.event){
      case 'get-blaze-data':
        __talkToExtension && __getBlazeData(__talkToExtension);
        break;
      case 'shutdown':
        hl && hl.remove();
        hl = null;
        break;
      case 'start-inspecting':
        hl = new Highlighter(window, node => { /*agent.selectFromDOMNode(node); */ });
        hl && hl.startInspecting();
        break;
      case 'hide-highlight':
        hl && hl.hideHighlight();
        break;
      case 'highlight':
        hl && hl.highlight(
          document.querySelector('[data-blaze-inspector-id=' + message.nodeId + ']'), 
          'element'
        );
        break;
      default:
        return;
    }
  }
}
