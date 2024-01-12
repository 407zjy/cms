import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 引入css全局样式
import './assets/css/base.css'
import './assets/font/iconfont.css'

// 导入树形表格插件
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles//
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 引入axios 并配置接口初始地址 然后挂载到vue原型上
import axios from 'axios'
axios.defaults.baseURL = 'https://api.jy123456.shop/admin'
// axios.defaults.baseURL = 'http://localhost:3000/admin'

// 请求拦截器  挂载token请求头
axios.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer' + ' ' + window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
// 全局注册树形表格插件
Vue.component('tree-table', TreeTable)

// 注册全局格式化时间戳处理函数
Vue.filter('dateFormat', function (originVal) {
    // 如果格式化出来的是1970年，那么乘以1000
    let time = originVal
    let dt = new Date(time)
    let y = dt.getFullYear()
    let m = (dt.getMonth() + 1 + '').padStart(2, '0')
    let d = (dt.getDate() + '').padStart(2, '0')

    let hh = (dt.getHours() + '').padStart(2, '0')
    let mm = (dt.getMinutes() + '').padStart(2, '0')
    let ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 注册富文本编辑器为全局可用的组件
Vue.use(VueQuillEditor)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
