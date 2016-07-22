
// var assert = require('assert');
var assert = require('power-assert');
var koaCore = require('../lib/index');

describe('http', function(){
  var http = koaCore.http;
  http.isSuccess = function (res) {
    return Number(res.code) === 1;
  }
  http.responseFormat = function(res) {
    return res.response;
  }
  http.errorFormat = function(res) {
    return res.msg;
  }
  http.errorCallback = function(response, body) {
    console.log(body);
  }
  describe('get', function() {
    it('testGet should be request without error', function(done){
      http.get('http://rap.taobao.org/mockjs/5691/testget',{id: 1})
      .then(function(res){
        assert.deepEqual(res, {a:1})
      })
      .then(done,done)
    });

    it('testGet2 should be error', function(done) {
      http.get('http://rap.taobao.org/mockjs/5691/testget2',{})
      .then(function(res){
        assert.equal(res , 'sss')
      })
      // .catch(function(err){
      //   assert(err != null)
      // })
      .then(done,done)
    })
  });



})
