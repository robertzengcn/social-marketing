import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout/layout.vue';
import { RouteRecordRaw } from 'vue-router';
// import { checkVersion } from '@/plugins/pwa';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/campaign/list',
    name: 'Dashboard',
    meta: {
      visible: true,
      title: 'Dashboard',
      icon: 'mdi-gauge',
    },
    component: Layout,
    children: [
      // {
      //     path: '/dashboard/smart-house',
      //     name: 'smartHouse',
      //     meta: {
      //         title: 'Smart House',
      //         icon: 'mdi-alpha-s',
      //         keepAlive: false,
      //         visible: true,
      //     },
      //     component: () => import('@/views/dashboard/smartHouse.vue'),
      //     children: [],
      // },
      // {
      //     path: '/campaign',
      //     name: 'Campaign',
      //     meta: {
      //         title: 'Campaign',
      //         icon: 'mdi-alpha-s',
      //         keepAlive: false,
      //         visible: true,
      //     },
      //     component: () => import('@/views/dashboard/campaign.vue'),
      //     children: [],
      // }
    ],
  },
  {
    path: '/campaign',
    name: 'campaign',
    meta: {
      visible: true,
      title: 'Campaign',
      icon: 'mdi-cube-scan',
    },
    component: Layout,
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-edit" */ '@/views/pages/campaign/campaign.vue'),
        name: 'EditCampaign',
        meta: {
          title: 'editCampaign',
          noCache: true,
          activeMenu: '/campaign/list',
          // hidden: true
        }
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/campaign/campaign.vue'),
        name: 'CampaignList',
        meta: {
          visible: true,
          title: 'campaignList',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/socialtask',
    name: 'socialtask',
    meta: {
      // visible: true,
      title: 'Social Task',
      icon: 'mdi-cube-scan',
    },
    component: Layout,
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-edit" */ '@/views/pages/socialtask/socialtaskdetail.vue'),
        name: 'EditSocialtask',
        meta: {
          title: 'Edit Socialtask',
          noCache: true,
          activeMenu: '/socialtask/edit',
          // hidden: true
        }
      },
      {
        path: 'create/:campaignId(\\d+)',
        component: () => import(/* webpackChunkName: "socialtaskdetail" */ '@/views/pages/socialtask/socialtaskdetail.vue'),
        name: 'CreateSocialtask',
        meta: {

          title: 'Create Socialtask',
          noCache: true,
          activeMenu: '/socialtask/create',
          //   hidden: true
        }
      },
      {
        path: 'list/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtask.vue'),
        name: 'SocialtaskList',
        meta: {
          title: 'socialtaskList',
          icon: 'list'
        }
      },
      {
        path: 'run/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrun.vue'),
        name: 'Runtask',
        meta: {
          title: 'Socialtask Run',
          icon: 'list'
        }
      }, {
        path: 'taskrunlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrunlist.vue'),
        name: 'Task-run-list',
        meta: {
          title: 'Social task Run List',
          icon: 'list'
        }
      },
      {
        path: 'taskresultlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskresultlist.vue'),
        name: 'Task-result-list',
        meta: {
          title: 'Social task Result List',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/socialaccount',
    name: 'Socialaccount',
    meta: {
      visible: true,
      title: 'Social Account',
      icon: 'mdi-paw-off'
    },
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccount.vue'),
        name: 'SocialAccount',
        meta: {
          visible: true,
          title: 'Account List',
          icon: 'list'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'editSocialAccount',
        meta: {
          visible: false,
          title: 'Edit Account',
          icon: 'list'
        }
      },
      {
        path: 'add',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'CreateSocialAccount',
        meta: {
          visible: false,
          title: 'Add Account',
          icon: 'list'
        }
      },
     
    ],
  },
  {
    path: '/proxy',
    name: 'Proxy',
    meta: {
      visible: true,
      title: 'Proxy',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/proxy/proxy.vue'),
        name: 'Proxylist',
        meta: {
          visible: true,
          title: 'Proxy List',
          icon: 'list'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'editProxy',
        meta: {
          visible: false,
          title: 'Edit Proxy',
          icon: 'list'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'AddProxy',
        meta: {
          visible: false,
          title: 'Add Proxy',
          icon: 'list'
        }
      },
      {
        path: 'parse',
        component: () => import('@/views/pages/proxy/proxyparse.vue'),
        name: 'ParseProxy',
        meta: {
          visible: true,
          title: 'Parse Proxy',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      icon: 'mdi-shield-account',
      visible: false,
    },
    component: () => import('@/views/pages/login/login.vue'),
  },
  { path: '/:pathMatch(.*)', name: 'Match', meta: { keepAlive: false }, redirect: '/404' },
  {
    path: '/404',
    name: '404',
    meta: { keepAlive: false, title: 'Not found', icon: 'mdi-paw-off', visible: false },
    component: Layout,
    children: [
      {
        path: '',
        name: 'd404',
        meta: {
          title: 'Not found',
          visible: false,
        },
        component: () => import('@/views/feedback/no.vue'),
        children: [],
      },
    ],
  },
];


// router.beforeEach(async (to, _from, next) => {
//     next();
// });

// router.afterEach(() => {
//     checkVersion();
// });
// export default router;

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteRecordRaw[] = [];

// const router = createRouter({
//     // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
//     scrollBehavior: () => {
//         return { top: 0 };
//     },
//     // base: process.env.BASE_URL,
//     routes: constantRoutes
//   })
// const router = createRouter({
//     history: createWebHashHistory(),
//     scrollBehavior() {
//         return { top: 0 };
//     })};

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: constantRoutes
});


export default router;

