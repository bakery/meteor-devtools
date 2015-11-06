jest.autoMockOff();

const _ = require('underscore');
const DDPGenerator = require('../src/ddp-generator');
const TraceProcessor = require('../src/trace-processor');
const Store = require('../src/trace-store');
const TraceFilter = require('../src/trace-filter');

let runProcessor = (traces, isOutbound=true) => {
  // XX: need to prepare traces using
  // Store.transforMessage before passing it to TraceProcessor
  return TraceProcessor.processTraces(
    _.map(traces, (m) => Store.transformMessage(m,isOutbound))
  );
};

describe('Trace Filter', () => {
  it('filters traces from the processed list', () => {
    let sub = DDPGenerator.generate({ type : 'sub' });
    let ping = DDPGenerator.generate({ type : 'ping'});
    // process traces before filtering
    let r = runProcessor([sub, ping]);

    let f = TraceFilter.filterTraces(r, ['ping']);
    expect(f).toContain(r[0]);
    expect(f).not.toContain(r[1]);
  });
});