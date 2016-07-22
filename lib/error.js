'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 定义常用的错误类型
 * @module
 * @author vega <vegawong@126.com>
**/

var ApiRequestError = function (_Error) {
  _inherits(ApiRequestError, _Error);

  function ApiRequestError(message) {
    _classCallCheck(this, ApiRequestError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApiRequestError).call(this, message));

    _this.type = 'ApiRequestError';
    return _this;
  }

  return ApiRequestError;
}(Error);

;

var DBError = function (_Error2) {
  _inherits(DBError, _Error2);

  function DBError(message) {
    _classCallCheck(this, DBError);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DBError).call(this, message));

    _this2.type = 'DBError';
    return _this2;
  }

  return DBError;
}(Error);

;

var PageError = function (_Error3) {
  _inherits(PageError, _Error3);

  function PageError(message) {
    var status = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

    _classCallCheck(this, PageError);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(PageError).call(this, message));

    _this3.type = 'PageError';
    _this3.status = status;
    return _this3;
  }

  return PageError;
}(Error);

var CodeException = function (_Error4) {
  _inherits(CodeException, _Error4);

  function CodeException(message) {
    _classCallCheck(this, CodeException);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CodeException).call(this, message));

    _this4.type = 'CodeException';
    return _this4;
  }

  return CodeException;
}(Error);

exports.ApiRequestError = ApiRequestError;
exports.DBError = DBError;
exports.PageError = PageError;
exports.CodeException = CodeException;