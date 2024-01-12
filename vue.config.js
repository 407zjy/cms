
module.exports = {
    // webpack配置
    // proxyTable: {
    //     proxy: {
    //         '/api': { // 将www.exaple.com印射为/apis
    //             target: 'https://127.0.0.1:3000/api',
    //             secure: false,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': '/api'
    //             }
    //         }
    //     }
    // },
    configureWebpack: {
    // 关闭 webpack 的性能提示
        performance: {
            hints: false
        }
    }
}
