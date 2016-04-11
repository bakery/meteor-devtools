const __getMinimongoCollections = (callback) => {
  let data = {};
  const collections = Meteor.connection._mongo_livedata_collections;
  for(let i in collections) {
    data[collections[i].name] = collections[i].find().fetch();
  }
  callback && callback('minimongo-explorer', data);
};

module.exports = {
  setup : (talkToExtension) => {
    Tracker.autorun(function(){
      // setup reactivity
      const collections = Meteor.connection._mongo_livedata_collections;
      for(let i in collections) {
        collections[i].find();
      }
      __getMinimongoCollections(talkToExtension)
    });
  }
};
