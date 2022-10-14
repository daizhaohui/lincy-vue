import Login from '../pages/login/index.vue';
import Home from '../pages/home/index.vue';
import About from '../pages/about/index.vue';
import NotFound from '../pages/notFound/index.vue';
import Http from '../pages/http/index.vue';
import Track from '../pages/track/index.vue';
import Model from '../pages/model/index.vue';
import Directive from '../pages/directives/index.vue'
import Utils from '../pages/utils/index.vue'
import DOM from '../pages/dom/index.vue'
import RouteChildren from '../pages/routeChildren/index.vue'
import  ChildrenOne from '../pages/routeChildren/childrenOne/index.vue'
import ChildrenTwo from '../pages/routeChildren/childrenTwo/index.vue'

const routes =[
  {
    name:'root',
    component:Login,
    redirect:'/login',
    path:'/',
  },
  {
    name:'home',
    component:Home,
    path:'/home/:id',
  },
  {
    name:'login',
    component:Login,
    path:'/login',
  },
  {
    name:'about',
    component:About,
    path:'/about',
  },
  {
    name:'http',
    component:Http,
    path:'/http',
  },
  {
    name:'track',
    component:Track,
    path:'/track/:id',
  },
  {
    name:'model',
    component:Model,
    path:'/model',
  }, 
  {
    name:'directive',
    component:Directive,
    path:'/directive',
  },
  {
    name:'utils',
    component:Utils,
    path:'/utils',
  },
  {
    name:'dom',
    component:DOM,
    path:'/dom',
  },
  {
    name:'routeChildren',
    component: RouteChildren,
    path:'/routeChildren',
    children:[{
        name:'childrenOne',
        component:ChildrenOne,
        path:'childrenOne',
      },
      {
        name:'childrenTwo',
        component:ChildrenTwo,
        path:'childrenTwo',
      },
    ]
  },
  {
    path: '/:pathMatch(.*)',   // 匹配规则
    name: 'bad-not-found', 
    component: NotFound
  }
];

export default routes;