const operationTypes = {
  'PingPong' : ['ping','pong'],    
  'Subscriptions' : ['sub','unsub','nosub','ready'],
  'Collections' : ['added','removed','changed'],
  'Methods' : ['method','result','updated'],
  'Connect' : ['connect','connected','failed'],
};

export default operationTypes;