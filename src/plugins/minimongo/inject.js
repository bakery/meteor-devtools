import _ from 'underscore';

const __getMinimongoCollections = (callback) => {
  let data = {};
  _.each(Meteor.connection._mongo_livedata_collections,
    (collection) => {
      return data[collection.name] = collection.find().fetch();
    });
  callback && callback('minimongo-explorer', data);
};

module.exports = {
  setup : (talkToExtension) => {
    Tracker.autorun(function(){
      // setup reactivity
      _.each(Meteor.connection._mongo_livedata_collections, function(c){
        c.find();
      });
      __getMinimongoCollections(talkToExtension)
    });
  }
};
