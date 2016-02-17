# lambda-put-alias

creates or update AWS Lambda function's alias

## Usage

example.js:

```javascript
var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({
  profile: 'org-stuff'
});
AWS.config.credentials = credentials;

var putAlias = require('lambda-put-alias');

putAlias(
  new AWS.Lambda({
    region: 'ap-northeast-1'
  }),
  {
    FunctionName: 'list_users',
    Name: 'dev',
    FunctionVersion: '1',
    Description: 'this is development version',
  },
  function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);
```

```
$ node ./example.js
{
  "AliasArn": "arn:aws:lambda:ap-northeast-1:000000000000:function:list_users:dev",
  "Name": "dev",
  "FunctionVersion": "1",
  "Description": "this is development version"
}
```

## API

```javascript
var putAlias = require('lambda-put-alias')
```

### putAlias(lambda, params, cb)

The function creates or update AWS Lambda function's alias

- Arguments
  - lambda - **required** - `instance of AWS.Lambda`
  - params - **required** - `map<String>`
     - FunctionName - **required** - `String`
     - Name - **required** - `String`
     - FunctionVersion - **required** - `String`
     - Description `String`
  - cb - `function(err, data) {}` - called with following arguments on the end of operation
    - Arguments
      - err - `Error` - the error object from aws-sdk. Set to `null` if the operation is successful.
      - data - `map<String>` - the data from aws-sdk. Set to `null` if the operation error occur.
        - AliasArn - `String`
        - Name - `String`
        - FunctionVersion - `String`
        - Description - `String`
