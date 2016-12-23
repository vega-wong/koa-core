/**
 * http 请求模块(node端)
 * extend module 'request'
 * https://github.com/request/request/blob/master/README.md
 * @module Http
 * @author vega <vegawong@126.com>
 **/

import r from 'request';
import mockjs from 'mockjs';
import { ApiRequestError, CodeException } from './error';



// 发送请求
const send = (opt) => {
  return new Promise((resolve, reject) => {
    r(opt, (err, response, body) => {
      const url = opt.url;
      if (err) {
        reject(new ApiRequestError(`request [${url}] error: [${err}]`));
      } else {
        http.onComplete(response);
        if (response.statusCode === 200) {
          try {
            let res = opt.mock ? eval(`(${body})`) : JSON.parse(body);
            if (opt.mock) {
              res = mockjs.mock(res);
            }
            if (http.isSuccess(res)) {
              res = http.responseFormat(res);
              resolve(res);
            } else {
              http.errorCallback(response, res);
              resolve(null);
            }
          } catch (e) {
            reject(new CodeException(e.message));
          }
        } else {
          reject(new ApiRequestError(`the httpStatus of [${url}] is [${response.statusCode}]`));
        }
      }
    });
  });
}

const http = {
  get(url, params, header = {}) {
    const req = {url, params, header};
    http.onBeforeSend(req);
    const opt = Object.assign({}, http.defaultOptions, {
      url: req.url,
      method: 'GET',
      qs: req.params,
      header: req.header,
    });
    return send(opt);
  },

  post(url, params, header = {}) {
    const req = {url, params, header};
    http.onBeforeSend(req);
    const opt = Object.assign({}, http.defaultOptions, {
      url: req.url,
      method: 'POST',
      form: req.params,
      header: req.header,
    });
    return send(opt);
  }
}

http.defaultOptions = {
  time: true
};

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

export default http;
