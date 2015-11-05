jest.dontMock('../src/ddp-generator');
jest.dontMock('underscore');

const _ = require('underscore');
const DDPMessageGenerator = require('../src/ddp-generator');

let checkMessageFormat = (msg, predicate, numberOfMessages) => {
  if(numberOfMessages){
    expect(_.isArray(msg)).toBeTruthy();
    expect(msg.length).toEqual(numberOfMessages);
    _.each(msg, (m) => {
      expect(predicate.call(this,m)).toBeTruthy();
    });
  } else {
    expect(msg).toBeDefined();
    expect(predicate.call(this,msg)).toBeTruthy(
      `got ${msg}`
    );
  }
};

const messageChecks = {
  changed(m){
    return m.msg === 'changed' &&
      m.collection && _.isString(m.collection) &&
      _.isString(m.id) && _.isObject(m.fields);
  },
  added(m){
    return m.msg === 'added' &&
      _.isString(m.collection) &&
      _.isString(m.id) && _.isObject(m.fields);
  },
  removed(m){
    return m.msg === 'removed' &&
      _.isString(m.collection) && _.isString(m.id);
  },
  sub(m){
    return m.msg === 'sub' &&
      _.isString(m.id) && _.isString(m.name) && 
      _.isArray(m.params);
  },
  ready(m){
    return m.msg === 'ready' && _.isArray(m.subs);
  },
  method(m){
    return m.msg === 'method' && _.isString(m.method) &&
      _.isArray(m.params) && _.isString(m.id);
  },
  updated(m){
    return m.msg === 'updated' && _.isArray(m.methods);
  },
  connect(m){
    return m.msg === 'connect' && _.isString(m.version) &&
      _.isArray(m.support);
  },
  result(m){
    return m.msg === 'result' && _.isString(m.id) &&
      _.isObject(m.result);
  },
  resultWithError(m){
    return m.msg === 'result' && _.isString(m.id) &&
      _.isObject(m.error);
  }
};

describe('DDPMessageGenerator', () => {
  it('is defined', () => {
    expect(DDPMessageGenerator).toBeDefined();
  });

  it('has a method generate', () => {
    expect(DDPMessageGenerator.generate).toBeDefined();
  });

  it('has an object DDPMessages', () => {
    expect(DDPMessageGenerator.DDPMessages).toBeDefined();
    expect(_.isObject(DDPMessageGenerator.DDPMessages)).toBeTruthy();
  });
});

describe('DDPMessageGenerator.generate', () => {
  it('returns a random json message string', () => {
    let msg = DDPMessageGenerator.generate();
    expect(msg).toBeDefined();
    expect(_.isObject(msg)).toBeTruthy();
  });

  it('can generate ping message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'ping'
    });
    expect(JSON.stringify(msg)).toMatch(/{"msg":"ping"}/ig);
  });

  it('can generate pong message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'pong'
    });
    expect(JSON.stringify(msg)).toMatch(/{"msg":"pong"}/ig);
  });

  it('can generate changed message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'changed'
    });
    checkMessageFormat(msg, messageChecks.changed);

    let numberOfMessages = _.random(2,5);
    let msgs = DDPMessageGenerator.generate({
      type : 'changed',
      numberOfMessages : numberOfMessages
    });
    
    checkMessageFormat(msgs, messageChecks.changed, numberOfMessages);
    expect(
      _.uniq(_.pluck(msgs,'collection')).length === 1
    ).toBeTruthy('collection name is not consistent');
  });

  it('can generate added message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'added'
    });
    checkMessageFormat(msg, messageChecks.added);

    let numberOfMessages = _.random(2,5);
    let msgs = DDPMessageGenerator.generate({
      type : 'added',
      numberOfMessages : numberOfMessages
    });
    
    checkMessageFormat(msgs, messageChecks.added, numberOfMessages);
    expect(
      _.uniq(_.pluck(msgs,'collection')).length === 1
    ).toBeTruthy('collection name is not consistent');
  });

  it('can generate removed message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'removed'
    });
    checkMessageFormat(msg, messageChecks.removed);

    let numberOfMessages = _.random(2,5);
    let msgs = DDPMessageGenerator.generate({
      type : 'removed',
      numberOfMessages : numberOfMessages
    });

    checkMessageFormat(msgs, messageChecks.removed, numberOfMessages);
    expect(
      _.uniq(_.pluck(msgs,'collection')).length === 1
    ).toBeTruthy('collection name is not consistent');
  });

  it('can generate sub message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'sub'
    });
    checkMessageFormat(msg, messageChecks.sub);
  });

  it('can generate ready message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'ready'
    });
    checkMessageFormat(msg, messageChecks.ready);
  });

  it('can generate method message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'method'
    });
    checkMessageFormat(msg, messageChecks.method);
  });

  it('can generate updated message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'updated'
    });
    checkMessageFormat(msg, messageChecks.updated);
  });

  it('can generate connect message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'connect'
    });
    checkMessageFormat(msg, messageChecks.connect);
  });

  it('can generate result message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'result'
    });
    checkMessageFormat(msg, messageChecks.result);
  });

  it('can generate resultWithError message', () => {
    let msg = DDPMessageGenerator.generate({
      type : 'resultWithError'
    });
    checkMessageFormat(msg, messageChecks.resultWithError);
  });

  it('cannot generate unsupported message and complains about it', () => {
    expect(() => DDPMessageGenerator.generate({ type : 'not-a-valid-message' })).toThrow();
  });

  it('generates a random message when a spec is not given', () => {
    let supportedMessages = _.keys(DDPMessageGenerator.DDPMessages);
    let msg = DDPMessageGenerator.generate();
    expect(_.contains(supportedMessages, msg.msg)).toBeTruthy();
  });
});