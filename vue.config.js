const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
    pages:{
        index:{
            entry:"src/main.ts",
            
        }
    }
  //devServer.proxy适用于本地开发使用，
    //生成环境请用第三方代理软件，如nginx。
  //   devServer: {
  //     port: 8080, //本机端口号
  //     host: "localhost", //本机主机名
  //     https: false, //协议
  //     open: false, //启动服务器时自动打开浏览器访问
  //     proxy: {
  //         '/api': {
  //             //目标服务器,代理访问到http://localhost:8888
  //             target: "https://imissu.herokuapp.com/api",
  //             changOrigin: true, //开启代理
  //             pathRewrite: {
  //                 '^/api': ''
  //             }
  //         }
  //     }
  // }


})
