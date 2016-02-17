module.exports = function(lambda, params, cb) {
  cb = cb || function() {};

  exists(lambda, params, function(err, exists) {
    if (err) {
      cb(err, null);
    } else {
      if (exists) {
        update(lambda, params, cb);
      } else {
        create(lambda, params, cb);
      }
    }
  });
};

function create(lambda, params, cb) {
  lambda.createAlias({
    FunctionName: params.FunctionName,
    FunctionVersion: params.FunctionVersion,
    Name: params.Name,
    Description: params.Description,
  }, cb)
}

function update(lambda, params, cb) {
  lambda.updateAlias({
    FunctionName: params.FunctionName,
    FunctionVersion: params.FunctionVersion,
    Name: params.Name,
    Description: params.Description,
  }, cb)
}

function exists(lambda, params, cb) {
  lambda.getAlias(
    {
      FunctionName: params.FunctionName,
      Name: params.Name,
    },
    function(err, _) {
      if (err) {
        if (err.statusCode === 404) {
          cb(null, false);
        } else {
          cb(err, null);
        }
      } else {
        cb(null, true);
      }
    }
  );
}
