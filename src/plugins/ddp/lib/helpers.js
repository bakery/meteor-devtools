export default {
  unescapeBackSlashes(str) {
    return str.replace(/\\"/g, '"');
  },
  compactJSONString(d, maxLength) {
    var str  = JSON.stringify(d);
    if(str.length <= maxLength){
      return str;
    } else { 
      var postFix = ' ... }';
      return [str.substr(0,maxLength - postFix.length),
        postFix].join('');
    }
  }
};