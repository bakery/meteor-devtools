jest.dontMock('../src/ddp-generator');
jest.dontMock('underscore');

const _ = require('underscore');

describe('DDPMessageGenerator', () => {
  it('is defined', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    expect(DDPMessageGenerator).toBeDefined();
  });

  it('has a method generate', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    expect(DDPMessageGenerator.generate).toBeDefined();
  });

  it('has an object DDPMessages', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    expect(DDPMessageGenerator.DDPMessages).toBeDefined();
    expect(_.isObject(DDPMessageGenerator.DDPMessages)).toBeTruthy();
  });
});


const checkMessageFormat = (msg, predicate) => {
  const parsedMessage = JSON.parse(msg);
  expect(parsedMessage).toBeDefined();
  expect(predicate.call(this,parsedMessage)).toBeTruthy(
    `got ${msg}`
  );
};

describe('DDPMessageGenerator.generate', () => {
  it('returns a random json message string', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate();
    expect(msg).toBeDefined();
    expect(JSON.parse(msg)).toBeDefined();
  });

  it('can generate ping message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'ping'
    });
    expect(msg).toMatch(/{"msg":"ping"}/ig);
  });

  it('can generate pong message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'pong'
    });
    expect(msg).toMatch(/{"msg":"pong"}/ig);
  });

  it('can generate changed message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'changed'
    });
    
    checkMessageFormat(msg, (m) => {
      return m.msg === 'changed' &&
        m.collection && _.isString(m.collection) &&
        _.isString(m.id) && _.isObject(m.fields)
    });
  });

  it('can generate added message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'added'
    });
    
    checkMessageFormat(msg, (m) => {
      return m.msg === 'added' &&
        _.isString(m.collection) &&
        _.isString(m.id) && _.isObject(m.fields)
    });
  });

  it('can generate removed message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'removed'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'removed' &&
        _.isString(m.collection) && _.isString(m.id) 
    });
  });

  it('can generate sub message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'sub'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'sub' &&
        _.isString(m.id) && _.isString(m.name) && _.isArray(m.params) 
    });
  });

  it('can generate ready message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'ready'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'ready' && _.isArray(m.subs) 
    });
  });

  it('can generate method message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'method'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'method' && _.isString(m.method) &&
        _.isArray(m.params) && _.isString(m.id);
    });
  });

  it('can generate updated message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'updated'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'updated' && _.isArray(m.methods);
    });
  });

  it('can generate connect message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'connect'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'connect' && _.isString(m.version) &&
        _.isArray(m.support);
    });
  });

  it('can generate result message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'result'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'result' && _.isString(m.id) &&
        _.isObject(m.result);
    });
  });

  it('can generate resultWithError message', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const msg = DDPMessageGenerator.generate({
      type : 'resultWithError'
    });

    checkMessageFormat(msg, (m) => {
      return m.msg === 'result' && _.isString(m.id) &&
        _.isObject(m.error);
    });
  });

  it('cannot generate unsupported message and complains about it', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');    
    expect(() => DDPMessageGenerator.generate({ type : 'not-a-valid-message' })).toThrow();
  });

  it('generates a random message when a spec is not given', () => {
    const DDPMessageGenerator = require('../src/ddp-generator');
    const supportedMessages = _.keys(DDPMessageGenerator.DDPMessages);
    const msg = JSON.parse(DDPMessageGenerator.generate());
    expect(_.contains(supportedMessages, msg.msg)).toBeTruthy();
  });
});