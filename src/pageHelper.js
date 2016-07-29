/**
 * jade 模板调用的函数集合
 * @module
 * @author vega <vegawong@126.com>
**/

import { file } from './fileHelper';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

const envName = process.env.envName || 'dev';


// 获取项目webpack生成的json映射文件
const getAssetJson = function(fileName) {
  let cwd = process.cwd();
  let parts = cwd.split(path.sep);
  do {
    let loc = parts.join(path.sep);
    if (!loc) break;
    let jsonFile = path.join(loc, fileName);
    if (fs.existsSync(jsonFile)) {
      return jsonFile;
    }
    parts.pop();
  } while (parts.length);
  throw new Error(`${fileName} Not Found in the project directory`);
}


class PageHelper {
  constructor(options) {
    this.options = Object.assign({
      jsonFileName: 'staticAsset.json',
      imgAssetsFileName: null
    }, options || {});
    let jsonFile = getAssetJson(this.options.jsonFileName);
    this.moduleState = file.readJSON(jsonFile)
    if (this.options.imgAssetsFileName) {
      let imgJsonFile = getAssetJson(this.options.imgAssetsFileName);
      this.imgModuleState = file.readJSON(imgJsonFile);
    }
  }

  setScript(moduleName) {
    if (moduleName && this.moduleState[moduleName] && this.moduleState[moduleName]['js']) {
      return this.moduleState[moduleName]['js'];
    } else {
      return '';
    }
  }

  setCss(moduleName) {
    if (moduleName && this.moduleState[moduleName] && this.moduleState[moduleName]['css']) {
      return this.moduleState[moduleName]['css'];
    } else {
      return '';
    }
  }

  setImgSrc(srcPath) {
    // console.log(this.imgModuleState,srcPath);
    for(let v of this.imgModuleState) {
      if (srcPath && v.name === srcPath) {
        return v.assets;
      }
    }
    return '';
  }

  isToday(date) {
      try {
          return mement().isSame(date, 'day');
      } catch (e) {
          return false;
      }
  }
  formatDate (dateString, format) {
      //设置语言
      moment.locale('zh-cn');
      if (isNaN(Number(dateString))) {
        return moment(dateString).format(format);
      } else {
        return moment(Number(dateString)).format(format);
      }
  }
  fromNow(dateString) {
    //设置语言
    moment.locale('zh-cn');
    if (isNaN(Number(dateString))) {
      return moment(dateString).fromNow();
    } else {
      return moment(Number(dateString)).fromNow();
    }
  }
  getweek (dateString) {
    return moment(dateString).format('dddd').replace(/星期/, '周');
  }

}

export default PageHelper;
