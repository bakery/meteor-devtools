jest.dontMock('../src/store');
jest.dontMock('../src/ddp-generator');
jest.dontMock('underscore');

describe('Store', function(){
  it('calls processTraces on TraceProcessor when calling getState', function(){
    const Store = require('../src/store');
    const TraceProcessor = require('../src/trace-processor');
    const DDPGenerator = require('../src/ddp-generator');
    const message = DDPGenerator.generate();

    Store.addTrace({
      jsonString : JSON.stringify(message),
      isOutbound : true
    });
    Store.getState();

    expect(TraceProcessor.processTraces).toBeCalled();
  });
});