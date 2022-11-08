import Vue from 'vue'
import VueRouter from 'vue-router'
import PageOne from "@/views/PageOne";
import PageTwo from "@/views/PageTwo";
import PageThree from "@/views/PageThree";
import IndexView from "@/views/IndexView";
import axios from "axios";
import LoginView from "@/views/LoginView";
Vue.use(VueRouter)

const routes = [
  {

    path: '/',
    name:'设置',
    component: LoginView,
    children:[
      {
        path: "/login",
        name:"登出",
        component: LoginView,
      },
    ]
  },
  {
    path: '/service',
    name:"学生管理",
    component:IndexView,
    children:[
      {
        path: "/search",
        name:"查询学生",
        component: PageOne,

      },
      {
        path: "/add",
        name:"添加学生",
        component: PageTwo,
      },
      {
        path: '/update',
        name:'修改数据',
        component: PageThree,
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

//前端进行拦截
router.beforeEach((to,from,next)=>{
  if(to.path.startsWith('/login')){
    window.localStorage.removeItem('permit')
    next()
  }else{
    let permit=JSON.parse(window.localStorage.getItem('permit'))
    if(!permit){
      next({path:'/login'})
    }else{
      axios({
        url:'http://8.142.190.232:8088/service/student/check',
        method:'get',
        headers: {
          token:permit.token
        }
      }).then((resp)=> {
        console.log(resp.data)
        if(!resp.data){
          next({path:'/login'})
        }
      })
      next()
    }
  }
})

export default router
