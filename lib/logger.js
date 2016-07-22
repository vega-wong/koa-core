'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _miniLogger = require('mini-logger');

var _miniLogger2 = _interopRequireDefault(_miniLogger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validConf = function validConf() {
  throw new Error('Logger\'s constructor need a config object param, the config object options that you can see https://github.com/node-modules/mini-logger#options');
};

var defaultConfig = {
  dir: _path2.default.join(__dirname, 'logs'),
  categories: ['http', 'error'],
  format: '[{category}.]YYYY-MM-DD[.log]',
  seperator: _os2.default.EOL,
  mkdir: true,
  stdout: true
};

var Logger = function () {
  function Logger() {
    var conf = arguments.length <= 0 || arguments[0] === undefined ? validConf() : arguments[0];

    _classCallCheck(this, Logger);

    this.props = {
      config: conf
    };
  }

  _createClass(Logger, [{
    key: 'getInstance',
    value: function getInstance() {
      if (!this.logger) {
        this.logger = (0, _miniLogger2.default)(this.props.config);
      }
      return this.logger;
    }
  }, {
    key: 'log',
    value: function log(msg) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? 'log' : arguments[1];

      var logger = this.getInstance();
      if (!logger[type]) {
        return;
      }
      var logMsg = this.formatMsg(msg, type);
      logger[type].call(this, logMsg);
    }
  }, {
    key: 'formatMsg',
    value: function formatMsg(msg, type) {
      _util2.default.format('[%s]-[%s]: %s', type, (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss'), msg);
      return msg;
    }
  }]);

  return Logger;
}();

var instance = new Logger(defaultConfig);
instance.Logger = Logger;

exports.default = instance;
module.exports = exports['default'];