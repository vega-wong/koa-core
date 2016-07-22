'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.file = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 文件操作
 * @module
 * @author vega <vegawong@126.com>
**/

// 'use strict';

var file = {
  has: function has(uri) {
    return _fs2.default.existsSync(uri);
  },
  write: function write(uri, content) {
    if (file.has(uri)) {
      _fs2.default.chmodSync(uri, '755');
    }
    _fs2.default.writeFileSync(uri, content, 'utf8');
  },
  read: function read(uri, def) {
    if (file.has(uri) === false) {
      return def;
    }
    return _fs2.default.readFileSync(uri, 'utf8');
  },
  remove: function remove(uri) {
    if (file.has(uri)) {
      _fs2.default.chmodSync(uri, '755');
      _fs2.default.unlinkSync(uri);
    }
  },
  readJSON: function readJSON(uri, def) {
    var txt = file.read(uri, false);
    if (!txt) {
      return def;
    }
    txt = String(txt).replace(/[^:]\/\/.*"?[\r\n\r]/g, '');
    return JSON.parse(txt);
  },
  mkdirSync: function mkdirSync(dirname) {
    if (_fs2.default.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkdirSync(_path2.default.dirname(dirname))) {
        _fs2.default.mkdirSync(dirname);
        return true;
      }
      return false;
    }
  }
};

exports.file = file;