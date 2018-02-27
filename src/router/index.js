import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/HelloFromVux'
import Index from '../components/pages/home/Home'
import Mine from '../components/pages/mine/Mine'
import Login from '../components/pages/login/Login'
import Fastpy from '../components/pages/fastpy/Fastpy'
import Step1 from '../components/pages/fastpy/Step1'
import Step2 from '../components/pages/fastpy/Step2'
import Step3 from '../components/pages/fastpy/Step3'
import FlowShow from '../components/pages/flow/Flow'
import Realcheck from '../components/pages/realcheck/Realcheck'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home,
      children: [
        {
          path: '/home',
          name: 'home',
          component: Index
        },
        {
          path: '/mine',
          name: 'mine',
          component: Mine
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/fastpy',
      name: 'fastpy',
      redirect: '/step1',
      component: Fastpy,
      children: [
        {
          path: '/step1',
          name: 'step1',
          component: Step1
        },
        {
          path: '/step2',
          name: 'step2',
          component: Step2
        },
        {
          path: '/step3',
          name: 'step3',
          component: Step3
        }
      ]
    },
    {
      path: '/flowshow',
      name: 'flowShow',
      component: FlowShow
    },
    {
      path: '/realcheck',
      name: 'realcheck',
      component: Realcheck
    }
  ]
})
