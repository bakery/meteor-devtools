jest.dontMock('../src/store');
jest.dontMock('../src/ddp-generator');
jest.dontMock('underscore');

describe('Store', function(){
  it('calls processTraces on TraceProcessor when calling getState', function(){
    const Store = require('../src/store');
    const TraceProcessor = require('../src/trace-processor');
    const DDPGenerator = require('../src/ddp-generator');
    const message = DDPGenerator.generate();

    Store.addTrace(JSON.stringify(message), true);
    Store.getState();

    expect(TraceProcessor.processTraces).toBeCalled();
  });
});