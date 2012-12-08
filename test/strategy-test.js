var vows = require('vows');
var assert = require('assert');
var util = require('util');
var LocalAPIKeyStrategy = require('passport-localapikey/strategy');
var BadRequestError = require('passport-localapikey/errors/badrequesterror');


vows.describe('LocalAPIKeyStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new LocalAPIKeyStrategy(function(){});
    },
    
    'should be named session': function (strategy) {
      assert.equal(strategy.name, 'localapikey');
    },
  },
  
  'strategy handling a request': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(null, user);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(apikey, done) {
          done(null, { apikey: apikey });
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
    },
  },
  
  'strategy handling a request with credentials in query': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(null, user);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(apikey, done) {
          done(null, { apikey: apikey });
        }
        
        req.query = {};
        req.query.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
    },
  },
  
  'strategy handling a request with req argument to callback': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy({passReqToCallback: true}, function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        req.foo = 'bar';
        strategy.success = function(user) {
          self.callback(null, user);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(req, apikey, done) {
          done(null, { foo: req.foo, apikey: apikey });
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
      'should have request details' : function(err, user) {
        assert.equal(user.foo, 'bar');
      },
    },
  },
  
  'strategy handling a request with parameter options set to plain string': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy({apikeyField: 'apikey'}, function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(null, user);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(apikey, done) {
          done(null, { apikey: apikey });
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
    },
  },
  
  'strategy handling a request with parameter options set to object-formatted string': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy({apikeyField: 'user[apikey]'}, function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(null, user);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(apikey, done) {
          done(null, { apikey:apikey });
        }
        
        req.body = {};
        req.body.user = {};
        req.body.user.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
    },
  },
  
  'strategy handling a request with additional info': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user, info) {
          self.callback(null, user, info);
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        
        strategy._verify = function(apikey, done) {
          done(null, { apikey:apikey }, { message: 'Welcome' });
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not generate an error' : function(err, user, info) {
        assert.isNull(err);
      },
      'should authenticate' : function(err, user) {
        assert.equal(user.apikey, 'a6578936DBJJJqwewrtrt');

      },
      'should pass additional info' : function(err, user, info) {
        assert.equal(info.message, 'Welcome');
      },
    },
  },
  
  'strategy handling a request that is not verified': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(new Error('should-not-be-called'));
        }
        strategy.fail = function() {
          self.callback();
        }
        
        strategy._verify = function(apikey, done) {
          done(null, false);
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should fail authentication' : function(err, user) {
        // fail action was called, resulting in test callback
        assert.isNull(err);
      },
    },
  },
  
  'strategy handling a request that is not verified with additional info': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(new Error('should-not-be-called'));
        }
        strategy.fail = function(info) {
          self.callback(null, info);
        }
        
        strategy._verify = function(apikey, done) {
          done(null, false, { message: 'Wrong ApiKey' });
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should fail authentication' : function(err, info) {
        // fail action was called, resulting in test callback
        assert.isNull(err);
      },
      'should pass additional info' : function(err, info) {
        assert.equal(info.message, 'Wrong APIKey');
      },
    },
  },
  
  'strategy handling a request that encounters an error during verification': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.success = function(user) {
          self.callback(new Error('should-not-be-called'));
        }
        strategy.fail = function() {
          self.callback(new Error('should-not-be-called'));
        }
        strategy.error = function(err) {
          self.callback(null, err);
        }
        
        strategy._verify = function(apikey, done) {
          done(new Error('something-went-wrong'));
        }
        
        req.body = {};
        req.body.apikey = 'a6578936DBJJJqwewrtrt';

        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should not call success or fail' : function(err, e) {
        assert.isNull(err);
      },
      'should call error' : function(err, e) {
        assert.instanceOf(e, Error);
      },
    },
  },
  
  'strategy handling a request without a body': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.fail = function(info) {
          self.callback(null, info);
        }
        
        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should fail authentication' : function(err, info) {
        // fail action was called, resulting in test callback
        assert.isTrue(true);
      },
      'should pass BadReqestError as additional info' : function(err, info) {
        assert.instanceOf(info, Error);
        assert.instanceOf(info, BadRequestError);
      },
    },
  },
  
  'strategy handling a request with a body, but no apikey': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.fail = function(info) {
          self.callback(null, info);
        }
        
        req.body = {};
        process.nextTick(function () {
          strategy.authenticate(req);
        });
      },
      
      'should fail authentication' : function(err) {
        // fail action was called, resulting in test callback
        assert.isTrue(true);
      },
      'should pass BadReqestError as additional info' : function(err, info) {
        assert.instanceOf(info, Error);
        assert.instanceOf(info, BadRequestError);
      },
    },
  },
  

  

  
  'strategy handling a request with a body, but no apikey, and badRequestMessage option': {
    topic: function() {
      var strategy = new LocalAPIKeyStrategy(function(){});
      return strategy;
    },
    
    'after augmenting with actions': {
      topic: function(strategy) {
        var self = this;
        var req = {};
        strategy.fail = function(info) {
          self.callback(null, info);
        }
        
        req.body = {};
        process.nextTick(function () {
          strategy.authenticate(req, { badRequestMessage: 'Something is wrong with this request' });
        });
      },
      
      'should fail authentication' : function(err) {
        // fail action was called, resulting in test callback
        assert.isTrue(true);
      },
      'should pass BadReqestError as additional info' : function(err, info) {
        assert.instanceOf(info, Error);
        assert.instanceOf(info, BadRequestError);
      },
      'should set message correctly' : function(err, info) {
        assert.equal(info.message, 'Something is wrong with this request');
      },
    },
  },
  
  'strategy constructed without a verify callback': {
    'should throw an error': function (strategy) {
      assert.throws(function() { new LocalAPIKeyStrategy() });
    },
  },

}).export(module);
