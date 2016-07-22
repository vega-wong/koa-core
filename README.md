
## `koa-core` the util library for `koa web application`

### Modules

#### Errors

there are some Object exports which all extends Error, they have the same property all `type` and the value are as the same as the object's name,
e.g.

```javascript
var err = new ApiRequestError('err message');
console.log(err.type);
console.log(err.message);
// ApiRequestError
// err message
```


- ApiRequestError

- DBError

- PageError

  it has the `status` property which stands for httpStatus, the same as http status code, default `500`

  ```javascript
  var err = new PageError('err message', 404);
  console.log(err.staus);
  console.log(err.message);
  // 404
  // err message
  ```

- CodeException

#### fileHelper

the util for handle files

- ##### has(uri)

  check the path exits?

  `uri`: the path (string)

  return true or false

- ##### write(uri, content)

  write something into the file

  `uri`: the file path (string)

  `content`: the file content (string)

- ##### read(uri, def)

  read file content

  `uri`: the file path (string)

  `def`: if readfile fail or file unexits (string)

  return string


- ##### remove(uri)

  remove file

  `uri`: the file path (string)

- ##### readJSON(uri, def)

  read the json file content and return a json object

  `uri`: the file path (string)

  `def`: the default return when the reading fail  (object)

- ##### mkdirSync(dirname)

  mkdir

  `dirname`: dirname


#### http
the module for http request which extend request

[https://github.com/request/request/blob/master/README.md](https://github.com/request/request/blob/master/README.md)

- ##### get(url, params, header)
  the request with `get` method

  `url`: request URL

  `params`: request params

  `header`: request header, default `{}`

  return promise

- ##### post(url, params, header)
  the request with `get` method

  `url`: request URL

  `params`: request params

  `header`: request header, default `{}`

  return promise

there are some method you can register to global

```javascript
// 注册请求前事件
http.onBeforeSend = function (req) {}

// 格式化输出
http.responseFormat = function (res) { return res; }

// 判断请求是否成功
http.isSuccess = function(res) { return Number(res.code) === 1; }

// 注册请求完成事件, 无论成功与否
http.onComplete = function(response) {}

// 业务上的错误回调
http.errCallback = function(response, body) {}

http.defaultOptions = {
  time: true
};
//option 结构参考 https://github.com/request/request/blob/master/README.md
```

#### logger

_use_:
```javascript
var logger = require('koa-core').logger;
logger.log('success','http')
```

- ##### log(msg, type)

  add logs content

  `msg`: logs content (string)

  `type`: log type which from your conf, default `log`(string)

there are some method you can register to global

```javascript
logger.formatMsg = function(msg, type) { }


```

- ##### `logger.Logger` is the constructor which you can extend,
  the only arg was the option the can see [https://github.com/node-modules/mini-logger#options](https://github.com/node-modules/mini-logger#options)






#### PageHelper

the helper for view engin

- ##### contructor(options)

  - options default was { jsonFileName: 'staticAsset.json' }

- ##### setCss(moduleName)

  get css url from the webpack asset.json file by moduleName

- ##### setScript(moduleName)

  get js url from the webpack asset.json file by moduleName

- ##### isToday(date)

  ...

- ##### formatDate (dateString, format)

  ...

- ##### getweek (dateString)

  format the date to `周x`
