jest.autoMockOff();

const _ = require('underscore');
const DDPGenerator = require('../lib/ddp-generator');
const TraceProcessor = require('../lib/trace-processor');
const Warnings = require('../lib/warnings');

let runProcessor = (traces, isOutbound=true) => {
  return TraceProcessor.processTraces(
    _.map(traces, (m) => {
      return {     
        message : m,
        isOutbound : isOutbound,
        _id : _.uniqueId('trace'),
        _timestamp : _.now()
      };
    })
  );
};

describe('Warnings module', () => {
  it('exports checkForWarnings method', () => {
    expect(Warnings).toBeDefined();
    expect(Warnings.checkForWarnings).toBeDefined();
    expect(_.isFunction(Warnings.checkForWarnings)).toBeTruthy();
  });
});

describe('User data overpublish warning', () => {
  it('is attached when overpublishing user data', () => {
    let traces = DDPGenerator.generate({
      type : 'added', numberOfMessages : 5,
      overrides : {
        collection : 'users',
        fields : {
          services : {
            password : {
              bcrypt : 'bcrypt'
            },
            resume : {
              loginTokens : [] 
            }
          }
        }
      }
    });

    let processedTraces = runProcessor(traces);
    Warnings.checkForWarnings(processedTraces);

    expect(processedTraces[0].warnings).toBeDefined();
    expect(processedTraces[0].warnings).toEqual(['user-overpublish']);  
  });
  
  it('is not attached for ordinary collection subs', () => {
    let traces = DDPGenerator.generate({
      type : 'added', numberOfMessages : 5
    });

    let processedTraces = runProcessor(traces);
    Warnings.checkForWarnings(processedTraces);

    expect(processedTraces[0].warnings).toBeUndefined();
  });
});