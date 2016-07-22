'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _error = require('./error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 发送请求
var send = function send(opt) {
  return new Promise(function (resolve, reject) {
    (0, _request2.default)(opt, function (err, response, body) {
      if (err) {
        reject(new _error.ApiRequestError('request [' + url + '] error: [' + err + ']'));
      } else {
        http.onComplete(response);
        if (response.statusCode === 200) {
          try {
            var res = opt.mock ? eval('(' + body + ')') : JSON.parse(body);
            if (opt.mock) {
              res = _mockjs2.default.mock(res);
            }
            if (http.isSuccess(res)) {
              res = http.responseFormat(res);
              resolve(res);
            } else {
              http.errorCallback(response, res);
              resolve(null);
            }
          } catch (e) {
            reject(new _error.CodeException(e.message));
          }
        } else {
          reject(new _error.ApiRequestError('the httpStatus of [' + url + '] is [' + response.statusCode + ']'));
        }
      }
    });
  });
}; /**
    * http 请求模块(node端)
    * extend module 'request'
    * https://github.com/request/request/blob/master/README.md
    * @module Http
    * @author vega <vegawong@126.com>
    **/

var http = {
  get: function get(url, params) {
    var header = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var req = { url: url, params: params, header: header };
    http.onBeforeSend(req);
    var opt = Object.assign({}, http.defaultOptions, {
      url: req.url,
      method: 'GET',
      qs: req.params,
      header: req.header
    });
    return send(opt);
  },
  post: function post(url, params) {
    var header = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var req = { url: url, params: params, header: header };
    http.onBeforeSend(req);
    var opt = Object.assign({}, http.defaultOptions, {
      url: req.url,
      method: 'POST',
      form: req.params,
      header: req.header
    });
    return send(opt);
  }
};

http.defaultOptions = {
  time: true
};

// 注册请求前事件
http.onBeforeSend = function (req) {};

// 格式化输出
http.responseFormat = function (res) {
  return res;
};

// 判断请求是否成功
http.isSuccess = function (res) {
  return Number(res.code) === 1;
};

// 注册请求完成事件, 无论成功与否
http.onComplete = function (response) {};

// 业务上的错误回调
http.errCallback = function (response, body) {};

exports.default = http;
module.exports = exports['default'];