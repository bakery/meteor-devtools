const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  setup() {
    if(!isProduction) {
      return;
    }

    var _gaq = _gaq || [];
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here
    
    ga('create', 'UA-41814664-7', 'auto');
    // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
    ga('set', 'checkProtocolTask', function(){});
    ga('require', 'displayfeatures');
  },

  trackPageView(pageUrl) {
    isProduction && ga && ga('send', 'pageview', pageUrl);
  },

  trackEvent(eventCategory, eventName, eventData) {
    isProduction && ga && ga('send', 'event',  eventCategory, eventName, eventData);
  } 
};