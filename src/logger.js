import miniLogger from 'mini-logger';
import path from 'path';
import util from 'util';
import moment from 'moment';
import os from 'os';


const validConf = () => {
  throw new Error(`Logger's constructor need a config object param, the config object options that you can see https://github.com/node-modules/mini-logger#options`);
}

const defaultConfig = {
  dir: path.join(__dirname, 'logs'),
  categories: [ 'http', 'error' ],
  format: '[{category}.]YYYY-MM-DD[.log]',
  seperator: os.EOL,
  mkdir: true,
  stdout: true
}

class Logger {
  constructor(conf = validConf()) {
    this.props = {
      config: conf,
    };
  }

  getInstance() {
    if (!this.logger) {
      this.logger = miniLogger(this.props.config)
    }
    return this.logger;
  }

  log(msg, type = 'log') {
    const logger = this.getInstance();
    if (!logger[type]) {
      return;
    }
    const logMsg = this.formatMsg(msg, type);
    logger[type].call(this, logMsg);
  }

  formatMsg(msg, type) {
    util.format('[%s]-[%s]: %s', type, moment().format('YYYY-MM-DD HH:mm:ss'), msg);
    return msg;
  }
}

const instance = new Logger(defaultConfig);
instance.Logger = Logger;

export default instance;
