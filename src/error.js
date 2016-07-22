/**
 * 定义常用的错误类型
 * @module
 * @author vega <vegawong@126.com>
**/

class ApiRequestError extends Error {
  constructor(message) {
    super(message);
    this.type = 'ApiRequestError';
  }
};

class DBError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DBError';
  }
};

class PageError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.type = 'PageError';
    this.status = status;
  }
}

class CodeException extends Error {
  constructor(message) {
    super(message);
    this.type = 'CodeException';
  }
}

export { ApiRequestError, DBError, PageError, CodeException };
