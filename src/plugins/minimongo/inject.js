const __getMinimongoCollections = (callback) => {
  let data = {};
  const collections = Meteor.connection._mongo_livedata_collections;
  for(let i in collections) {
    data[collections[i].name] = collections[i].find().fetch();
  }
  callback && callback('minimongo-explorer', data);
};

let __talkToExtension = null;

module.exports = {
  setup : (talkToExtension) => {
    __talkToExtension = talkToExtension;
    Tracker.autorun(function(){
      const collections = Meteor.connection._mongo_livedata_collections;
      for(let i in collections) {
        collections[i].find();
      }
      __getMinimongoCollections(talkToExtension)
    });
  },
  onMessage: (message) => {
    if(message.source !== 'minimongo-explorer'){
      return;
    }
    if(message.event === 'get-minimongo-collections'){
      __talkToExtension && __getMinimongoCollections(__talkToExtension);
    }
  }
};
