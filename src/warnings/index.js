import UserOverpublish from './user-overpublish';
import _ from 'underscore';

var checks = [
  new UserOverpublish()
];

module.exports = {
  checkForWarnings : function(traces){
    return _.reduce(checks, (ts, c) => c.check(ts), traces);
  }
};