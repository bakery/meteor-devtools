jest.autoMockOff();

const _ = require('underscore');
const DDPGenerator = require('../src/ddp-generator');
const TraceProcessor = require('../src/trace-processor');
const Store = require('../src/store');

let runProcessor = (traces, isOutbound=true) => {
  // XX: need to prepare traces using
  // Store.transforMessage before passing it to TraceProcessor
  return TraceProcessor.processTraces(
    _.map(traces, (m) => Store.transformMessage(m,isOutbound))
  );
};

let testLabel = (messages, expectedLabel) => {
  let actualLabel = runProcessor(
    _.isArray(messages) ? messages : [messages]
  )[0].label; 

  expect(actualLabel).toEqual(expectedLabel);
};

describe('Message Processor', () => {
  it('groups messages that belong to the same group', () => {
    let numberOfMessages = 4;
    let batch1 = DDPGenerator.generate({
      type : 'added', numberOfMessages
    });
    let batch2 = DDPGenerator.generate({
      type : 'added', numberOfMessages
    });
    let isOutbound = false;

    let runTestsOnBatch = (messages, processedTraces) => {
      expect(processedTraces.length).toEqual(1);
      expect(processedTraces[0].isOutbound).toEqual(isOutbound);
      expect(_.isArray(processedTraces[0].message)).toBeTruthy();

      expect(processedTraces[0].message.length).toEqual(numberOfMessages);
      
      _.each(messages, (m) => {
        const cm = _.find(processedTraces[0].message, (i) => i.id === m.id);
        expect(cm).toEqual(m);
      });  
    };

    _.each([batch1,batch2], (messages) => {
      let processedTraces = runProcessor(messages, isOutbound);
      runTestsOnBatch(messages, processedTraces);
    });
  });

  it('attaches correct label for **added/removed/changed** messages', () => {
    let numberOfMessages = 3;
    let labelsForMessageTypes = {
      added : {
        singleItemLabel : (i) => {
          return `item added to ${i.collection} collection`
        },
        multipleItemsLabel : (is) => {
          return `${numberOfMessages} items added to ${is[0].collection} collection`  
        }
      },

      removed : {
        singleItemLabel : (i) => {
          return `item removed from ${i.collection} collection`
        },
        multipleItemsLabel : (is) => {
          return `${numberOfMessages} items removed from ${is[0].collection} collection`  
        }
      },

      changed : {
        singleItemLabel : (i) => {
          return `item changed in ${i.collection} collection`
        },
        multipleItemsLabel : (is) => {
          return `${numberOfMessages} items changed ${is[0].collection} collection`  
        }
      }
    };

    _.each(_.keys(labelsForMessageTypes), (type) => {
      let message = DDPGenerator.generate({ type });
      let messages = DDPGenerator.generate({type, numberOfMessages});
      
      testLabel(message, 
        labelsForMessageTypes[type].singleItemLabel.call(this,message)
      );
      testLabel(messages, 
        labelsForMessageTypes[type].multipleItemsLabel.call(this,messages)
      ); 
    });
  });

  it('attaches correct label for **ping/pong/connect/updated/result**', () => {
    _.each(['ping','pong','connect','updated','result'], (type) => {
      let message = DDPGenerator.generate({ type });
      testLabel(message, type);
    });
  });

  it('attaches correct label for **sub**', () => {
    let message = DDPGenerator.generate({ type : 'sub' });
    let params = message.params.join(', ')
    testLabel(message, 
      `subscribing to ${message.name} with ${params}`);
  });

  it('attaches correct label for **ready**', () => {
    let message = DDPGenerator.generate({ type : 'ready' });
    let subs = message.subs.join(', ')
    testLabel(message, `subscription ready for ${subs}`);
  });

  it('attaches correct label for **method**', () => {
    let message = DDPGenerator.generate({ type : 'method' });
    let params = message.params.join(', ')
    testLabel(message, 
      `calling method ${message.method} with ${params}`);
  });

  it('attaches correct label for unknown messages', () => {
    let randomMessageType = 'randommessagetype';
    testLabel({msg: randomMessageType}, randomMessageType);
  });

  it('attaches operation attribute based on the msg type', () => {
    let keys = _.keys(_.omit(DDPGenerator.DDPMessages,'resultWithError'));
    _.each(keys, (type) => {
      let m = DDPGenerator.generate({type});
      let r = runProcessor([m]);
      expect(r[0].operation).toEqual(type);
    })
  });

  it('attaches operation attribute correctly for grouped items', () => {
    let ms = DDPGenerator.generate({type: 'added', numberOfMessages: 4});
    let rs = runProcessor(ms);
    expect(rs[0].operation).toEqual('added');
  });
});