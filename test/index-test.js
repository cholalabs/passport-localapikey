var vows = require('vows');
var assert = require('assert');
var util = require('util');
var localapikey = require('passport-localapikey');

vows.describe('passport-localapikey').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(localapikey.version);
    },
    
    'should export BadRequestError': function (x) {
      assert.isFunction(localapikey.BadRequestError);
    },
  },
  
}).export(module);
