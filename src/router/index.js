import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import CONFIG from '@/config'

Vue.use(Router)

const router = new Router({
  // base: '/app/',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/pages/home'),
      meta: {
        'title': '我的家园',
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/pages/login'),
      meta: {'title': '欢迎您'}
    },
    {
      path: '/authAccount',
      name: 'authAccount',
      component: ()=>import('@/pages/authAccount'),
      meta: {'title': '个人认证'}
    },
    {
      path: '/cash',
      name: 'cash',
      component: ()=>import('@/pages/cash'),
      meta: {'title': '提现'}
    },
    {
      // /hbDetail/33845/42701a
      path: '/hbDetail/:hbId/:groupId',
      name: 'hbDetail',
      component: ()=>import('@/pages/hbDetail'),
      meta: {'title': '领取详情'}
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: ()=>import('@/pages/recharge'),
      meta: {'title': '充值'}
    },
    {
      path: '/sendHb/:id',
      name: 'sendHb',
      component: ()=>import('@/pages/sendHb'),
      meta: {'title': '发红包'}
    },
    {
      path: '/qrcode/:groupId',//群组id
      name: 'qrcode',
      component: ()=>import('@/pages/qrcode'),
      meta: {'title': '二维码'}
    },
    {
      path: '/agent',
      name: 'agent',
      component: ()=>import('@/pages/agent'),
      meta: {'title': '代理中心'}
    },
    {
      path: '/userList',
      name: 'userList',
      component: ()=>import('@/pages/userList'),
      meta: {'title': '玩家列表'}
    },
    {
      path: '/commission',
      name: 'commission',
      component: ()=>import('@/pages/commission'),
      meta: {'title': '返佣记录'}
    },
    {
      path: '/record/:groupId',
      name: 'record',
      component: ()=>import('@/pages/record'),
      meta: {'title': '账单明细'}
    },
    {
      path: '/myQrCode',
      name: 'myQrCode',
      component: ()=>import('@/pages/myQrCode'),
      meta: {'title': '我的海报'}
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: ()=>import('@/pages/transfer'),
      meta: {'title': '转账'}
    },
    {
      path: '/ruler/:groupId',
      name: 'ruler',
      component: ()=>import('@/pages/ruler'),
      meta: {'title': '玩法规则'}
    },
    {
      path: '/*',
      redirect:'/login'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // store.commit('app_setSlideName')
  if (store.state && !to.matched.some(v => v.meta.disableLoading)) { // 路由跳转，显示菊花~ Author by Dio Zhu. on 2017.2.17
    store.commit('app_openLoading')
  }
  function setSlide(slide) {
    store.commit('app_setSlideName', slide)
  }
  if (to.query.key) {
    if(to.name==='sendHb'){
      setSlide('bottom');
    }else if (parseInt(from.query.key) > parseInt(to.query.key)) {
      console.log('后退')
      setSlide('left')
    } else {
      setSlide('right')
      console.log('前进')
    }
  } else {
    if (from.name) {
      setSlide('left')
      console.log('后退')
    } else {
      setSlide('right')
      console.log('前进')
    }
  }
  next()
})
router.afterEach(route => {
  if (route.meta && route.meta.title) {
    document.title = route.meta.title
  } else {
    document.title = CONFIG.TITLE
  }
  try { // 隐藏loading
    if (store && store.state) {
      setTimeout(function () {
        store.commit('app_closeLoading')
      }, 100)
    }
  } catch (e) {
    console.error('router.afterEach: ', e)
  }
})
let p = router.push
let r = router.replace
router.push = function (params) {
  if (params.query) {
    params.query.key = Date.now()
  } else {
    params.query = {key: Date.now()}
  }
  p.call(router, params)
}
router.replace = function (params) {
  if (params.query) {
    params.query.key = Date.now()
  } else {
    params.query = {key: Date.now()}
  }
  r.call(router, params)
}
// 导出router对象
export default router
