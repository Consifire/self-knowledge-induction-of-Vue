import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test1 from '@/components/test/test1'
import test2 from '../components/test/test2'

// import test3 from '../components/test/test3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test/test1',
      name: 'test1',
      component: test1
    },
    {
      path:'/test/test2',
      name:'test2',
      component:test2
    },
    {
      path:'/test/test3',
      name:'test3',
      // component: test3
    
      component:resolve=> require(["../components/test/test3.vue"],resolve)
    },
    {
      path:'*',
      redirect:'/test/test1'
    }

  ]
})
