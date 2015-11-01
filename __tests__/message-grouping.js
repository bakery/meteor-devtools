jest.autoMockOff();

const _ = require('underscore');
const Actions = require('../src/actions');
const Store = require('../src/store');
const DDPGenerator = require('../src/ddp-generator');

describe('Message grouping', () => {

  beforeEach(() => {
    Store.clear();
  });

  it('groups messages that belong to the same group', () => {
    const numberOfMessages = 4;
    const batch1 = DDPGenerator.generate({
      type : 'added', numberOfMessages : numberOfMessages
    });
    const batch2 = DDPGenerator.generate({
      type : 'added', numberOfMessages : numberOfMessages
    });
    const runTestsOnBatch = (messages,i) => {
      const state = Store.getState();
      
      expect(state[i].isOutbound).toBeFalsy();
      expect(_.isArray(state[i].message)).toBeTruthy();
      expect(state[i].message.length).toEqual(numberOfMessages);

      _.each(messages, (m) => {
        const cm = _.find(state[i].message, (i) => i.id === m.id);
        expect(cm).toEqual(m);
      });  
    };

    _.each([batch1,batch2], (messages) => {
      _.each(messages, (d) => {
        Actions.addTrace({
          messageJSON: JSON.stringify(d),
          isOutbound: false
        });
      });
    });

    runTestsOnBatch(batch1, 0);
    runTestsOnBatch(batch2, 1);
  });
});