jest.dontMock('../src/trace-store');
jest.dontMock('../src/ddp-generator');
jest.dontMock('underscore');

const _ = require('underscore');
const Store = require('../src/trace-store');
const TraceProcessor = require('../src/trace-processor');
const DDPGenerator = require('../src/ddp-generator');

describe('Store', function(){
  beforeEach( () => Store.clear() );

  it('calls processTraces on TraceProcessor when calling getState', () => {   
    let message = DDPGenerator.generate();

    Store.addTrace({
      jsonString : JSON.stringify(message),
      isOutbound : true
    });
    Store.getState();

    expect(TraceProcessor.processTraces).toBeCalled();
  });

  it('has transformMessage method that processes DDP message', () => {
    
    expect(_.isFunction(Store.transformMessage))
      .toBeTruthy('transformMessage is not defined');

    let message = DDPGenerator.generate();
    let isOutbound = true;    
    let transformedMessage = Store.transformMessage(message, true);
  
    expect(transformedMessage).toBeDefined();
    expect(transformedMessage.message).toEqual(message);
    expect(transformedMessage.isOutbound).toEqual(isOutbound);
    expect(transformedMessage._id).toBeDefined();
    expect(transformedMessage._timestamp).toBeDefined();
  });
});

describe('Store.addTrace', function(){
  beforeEach( () => Store.clear() );

  it('transforms message before storing it', () => {
    let message = DDPGenerator.generate();
    let isOutbound = true;

    Store.addTrace({
      jsonString : JSON.stringify(message),
      isOutbound : isOutbound
    });
    
    let state = Store.data;

    expect(state.length).toEqual(1);
    expect(state[0].message).toBeDefined();
    expect(state[0].message).toEqual(message);
    expect(state[0]._id).toBeDefined();
    expect(state[0]._timestamp).toBeDefined();
  });
});