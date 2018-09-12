// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './css/common.css'
import api from './api/index.js'
import network from './api/network.js'
import webapi from './api/webapi.js' //里面都是保存缓存参数
import QS from 'qs'
import VueAMap from 'vue-amap';
// import IEcharts from 'vue-echarts-v3/src/full.js';

Vue.use(VueAMap);
Vue.use(iView)
Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
    key:'90120f831d1ab02321fcdd94cdce109c',
    plugin: ['AMap.Geolocation','AMap.AMapManager','AMap.Geocoder'],
    uiVersion: '1.0.11'
});

Vue.prototype.$api = api
Vue.prototype.$netcode = network
Vue.prototype.$webapi = webapi
Vue.prototype.$QS = QS

// 判断页面是否需要登录
router.beforeEach((to, from , next) => {
	// console.log(to.matched.some(record => record.meta.requireAuth));
	// console.log(to.matched);
    /*判断下一个路由是否需要登录，对其进行验证*/
    if(to.matched.some(record => record.meta.requireAuth)) {
        let hasAuth=webapi.get("token") //判断用户是否登录
        if(Boolean(hasAuth)) {
            /*如果已经登录，可以进入页面*/
            next()
        }else {
            next("/login")
        }
    }else{
     	next()
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
