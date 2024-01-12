import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Userlist from '../components/users/Userlist.vue'
import Userlistapply from '../components/users/Userlistapply.vue'
import Girllist from '../components/girls/Girllist.vue'
import Girlrenzhenglist from '../components/girls/Girlrenzhenglist.vue'
import Girltipslist from '../components/girls/Girltipslist.vue'
import Girlcatelist from '../components/girls/Girlcatelist.vue'
import Brocast from '../components/brocast/Brocast.vue'
import Citylist from '../components/cities/Citylist.vue'
import Arealist from '../components/cities/Arealist.vue'
import Setgg from '../components/setting/Setgg.vue'
// import Setlive from '../components/setting/Setlive.vue'
// import Userdaili from '../components/users/Userdaili.vue'
// import Userstop from '../components/users/Userstop.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/index',
            children: [
                { path: '/index', component: Index },
                { path: '/users', component: Userlist },
                { path: '/usersapply', component: Userlistapply },
                { path: '/girls', component: Girllist },
                { path: '/rzapplay', component: Girlrenzhenglist },
                { path: '/girltips', component: Girltipslist },
                { path: '/girlcate', component: Girlcatelist },
                { path: '/cities', component: Citylist },
                { path: '/area', component: Arealist },
                { path: '/bclist', component: Brocast },
                { path: '/setgg', component: Setgg }
                // { path: '/setmac', component: Setmac },
                // { path: '/upmac', component: Upmac },
                // { path: '/addanimal', component: Addanimal },
                // { path: '/setlive', component: Setlive },

                // { path: '/userdaili', component: Userdaili },
                // { path: '/userstop', component: Userstop }

            ]
        }
    ]
})
// 挂载路由卫士
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router
