jest.autoMockOff();

const _ = require('underscore');
const DDPGenerator = require('../src/ddp-generator');
const TraceProcessor = require('../src/trace-processor');
const TraceFilter = require('../src/trace-filter');

let runProcessor = (traces, isOutbound=true) => {
  return TraceProcessor.processTraces(
    _.map(traces, (m) => {
      return _.extend({     
        message : m,
        isOutbound : isOutbound,
        _id : _.uniqueId('trace'),
        _timestamp : _.now()
      });
    })
  );
};

describe('Trace Filter', () => {
  it('filters traces from the processed list', () => {
    let sub = DDPGenerator.generate({ type : 'sub' });
    let ping = DDPGenerator.generate({ type : 'ping'});
    // process traces before filtering
    let r = runProcessor([sub, ping]);

    let f = TraceFilter.filterTraces(r, {
      PingPong : {
        enabled : false,
        operations : ['ping','pong']
      }
    });
    expect(f).toContain(r[0]);
    expect(f).not.toContain(r[1]);
  });
});