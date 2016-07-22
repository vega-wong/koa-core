'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * jade 模板调用的函数集合
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author vega <vegawong@126.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     **/

var _fileHelper = require('./fileHelper');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var envName = process.env.envName || 'dev';

// 获取项目webpack生成的json映射文件
var getAssetJson = function getAssetJson(fileName) {
  var cwd = process.cwd();
  var parts = cwd.split(_path2.default.sep);
  do {
    var loc = parts.join(_path2.default.sep);
    if (!loc) break;
    console.log(fileName);
    var jsonFile = _path2.default.join(loc, fileName);
    if (_fs2.default.existsSync(jsonFile)) {
      return jsonFile;
    }
    parts.pop();
  } while (parts.length);
  throw new Error(fileName + ' Not Found in the project directory');
};

var PageHelper = function () {
  function PageHelper(options) {
    _classCallCheck(this, PageHelper);

    this.options = Object.assign({
      jsonFileName: 'staticAsset.json'
    }, options || {});
    var jsonFile = getAssetJson(this.options.jsonFileName);
    this.moduleState = _fileHelper.file.readJSON(jsonFile);
  }

  _createClass(PageHelper, [{
    key: 'setScript',
    value: function setScript(moduleName) {
      if (moduleName && this.moduleState[moduleName] && this.moduleState[moduleName]['js']) {
        return this.moduleState[moduleName]['js'];
      } else {
        return '';
      }
    }
  }, {
    key: 'setCss',
    value: function setCss(moduleName) {
      if (moduleName && this.moduleState[moduleName] && this.moduleState[moduleName]['css']) {
        return this.moduleState[moduleName]['css'];
      } else {
        return '';
      }
    }
  }, {
    key: 'isToday',
    value: function isToday(date) {
      try {
        return mement().isSame(date, 'day');
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'formatDate',
    value: function formatDate(dateString, format) {
      //设置语言
      _moment2.default.locale('zh-cn');
      if (isNaN(Number(dateString))) {
        return (0, _moment2.default)(dateString).format(format);
      } else {
        return (0, _moment2.default)(Number(dateString)).format(format);
      }
    }
  }, {
    key: 'getweek',
    value: function getweek(dateString) {
      return (0, _moment2.default)(dateString).format('dddd').replace(/星期/, '周');
    }
  }]);

  return PageHelper;
}();

exports.default = PageHelper;
module.exports = exports['default'];