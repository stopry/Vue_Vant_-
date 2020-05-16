/***
 * log工具,可在congfig中配置
 *              - Author By Dio Zhu. on 2016.9.20
 * 之前用apply方式无法在后面显示实际调用地址，debug不爽，后改为bind方式。。。世界瞬间美好了~~~
 *              - Author By Dio Zhu. on 2016.12.23
 ***/
import config from '../../config'
import * as utils from './utils'

/**
 * 原型修改方式，针对个别不喜欢用logger封装方式的特殊处理
 *          -- Author by Dio Zhu. on 2016.12.23
 */
// if (window.console && console.log && config && config.DEBUG) {
//     let timestamp = function () { };
//     timestamp.toString = function () {
//         return '[' + utils.formatTime(new Date(), 'hh:mm:ss ms') + ']';
//     };
//     console.log = console.log.bind(console, timestamp);
//     console.log = console.log.bind(console);
//     console.error = console.error.bind(console);
//     console.warn = console.warn.bind(console);
// } else {
//     console.log = function () {};
// }

let logger = (function () {
  let timestamp = function () {
    },
    logFunc = function () {
    },
    errorFunc = function () {
    },
    warnFunc = function () {
    };
  timestamp.toString = function () {
    return '[' + utils.formatTime(new Date(), 'hh:mm:ss ms') + ']' + '[' + utils.getCurrentPath({pathOnly: true}) + ']';
  };

  if (window.console && console.log && config && config.DEBUG) {
    logFunc = console.log.bind(console, '%s', timestamp);
  }
  errorFunc = console.error.bind(console, '%s', timestamp);
  warnFunc = console.warn.bind(console, '%s', timestamp);
  return {
    log: logFunc,
    error: errorFunc,
    warn: warnFunc
  };
})();
export default logger;
