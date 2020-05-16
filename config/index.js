'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

var os = require('os');
var IPv4, hostName;
hostName = os.hostname();

// for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
//   if (os.networkInterfaces().en0[i].family == 'IPv4') {
//     IPv4 = os.networkInterfaces().en0[i].address;
//   }
// }

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();　　
  for (var devName in interfaces) {　　　　
      var iface = interfaces[devName];　　　　　　
      for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
              return alias.address;
          }
      }　　
  }
}

if (os.platform() !== 'darwin') { // 不是mac(window)
  IPv4 = getIPAdress()
} else { // mac
  IPv4 = '0.0.0.0'
}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/api":{
        target: 'http://dfhhb1.0001wan.com',  //目标接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          // '^/api': '/api'   //重写接口
        }
      }
    },
    // Various Dev Server settings
    host: IPv4, // can be overwritten by process.env.HOST
    //host: 'localhost', // can be overwritten by process.env.HOST
    port: 8089, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: process.env.NODE_ENV == 'production'?false:true,//关闭生产环境中 sourcemap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: process.env.NODE_ENV == 'production'?false:'#source-map',//关闭生产环境中 sourcemap

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: process.env.NODE_ENV == 'production'?true:false,//打开生产环境中gzip
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
