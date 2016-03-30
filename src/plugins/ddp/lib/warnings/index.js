import UserOverpublish from './user-overpublish';
import UknownPublication from './unknown-publication';

import _ from 'underscore';

var checks = [
  new UserOverpublish(),
  new UknownPublication()
];

module.exports = {
  checkForWarnings : function(traces){
    return _.reduce(checks, (ts, c) => c.check(ts), traces);
  }
};