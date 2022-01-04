// 用来获取本地ip
const ip = require('ip')
// 判断是否生产环境
const isProd = process.env.NODE_ENV === 'production'
const pluginOptions = {
    path: './'
}


module.exports = {
    // 测试服务启动时显示的ip,端口,代理配置
    devServer: {
        // 默认会自动打开浏览器
        open: true,
        disableHostCheck: true
    },
    // 部署应用包时的基本 URL,生产环境使用的是公用参数中的path
    publicPath: isProd ? pluginOptions.path : '/',
    // 是否生成sourcemap文件，生产环境不生成以加速生产环境构建
    configureWebpack: config => {
        config.devtool = isProd ? false: 'source-map'
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(options => {
                options[0].title = '一介布衣'; // page title
                return options
            })
    },
    // 静态资源文件的目录
    assetsDir: 'static',
    // css是否开启sourcemap,生产环境不生成
    css: {
        sourceMap: !isProd,
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/common/base.scss";` //引入全局变量

            }
        }
    }
}