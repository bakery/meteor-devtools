jest.autoMockOff();

const _ = require('underscore');
const DDPGenerator = require('../src/ddp-generator');
const TraceProcessor = require('../src/trace-processor');
const Store = require('../src/store');

describe('Message Processors', () => {

  it('groups messages that belong to the same group', () => {
    let numberOfMessages = 4;
    let batch1 = DDPGenerator.generate({
      type : 'added', numberOfMessages : numberOfMessages
    });
    let batch2 = DDPGenerator.generate({
      type : 'added', numberOfMessages : numberOfMessages
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
      let processedTraces = TraceProcessor.processTraces(
        _.map(messages, (m) => Store.transformMessage(m,isOutbound))
      );

      runTestsOnBatch(messages, processedTraces);
    });
  });
});