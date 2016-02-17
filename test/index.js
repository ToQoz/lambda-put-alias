var test = require('tape');

var putAlias = require('..')

test("putAlias() calls create() if the alias doesn't exist", function (t) {
  t.plan(1);

  var lambda = {
    getAlias: function(params, cb) {
      cb({statusCode: 404}, null);
    },
    createAlias: function() {
      t.pass("create() is called");
    },
    updateAlias: function() {
      t.fail("update() is called");
    },
  };

  putAlias(lambda, {}, function() {});
});

test("putAlias() calls update() if the function exists", function (t) {
  t.plan(1);

  var lambda = {
    getAlias: function(params, cb) {
      cb(null, true);
    },
    createAlias: function() {
      t.fail("create() is called");
    },
    updateAlias: function() {
      t.pass("update() is called");
    },
  };

  putAlias(lambda, {}, function() {});
});

test("putAlias() return NO error if it is 404", function (t) {
  t.plan(1);

  var lambda = {
    getAlias: function(params, cb) {
      cb({statusCode: 404}, null);
    },
    createAlias: function(params, cb) {
      cb(null, null);
    },
    updateAlias: function(params, cb) {
      cb(null, null);
    },
  };

  putAlias(lambda, {}, function(err, _) {
    t.equal(err, null);
  });
});

test("putAlias() return the error if it is NOT 404", function (t) {
  t.plan(1);

  var lambda = {
    getAlias: function(params, cb) {
      cb({statusCode: 403}, null);
    },
    createAlias: function(params, cb) {
      cb(null, null);
    },
    updateAlias: function(params, cb) {
      cb(null, null);
    },
  };

  putAlias(lambda, {}, function(err, _) {
    t.notEqual(err, null);
  });
});
