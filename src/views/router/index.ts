import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout/layout.vue';
import {RouteRecordRaw } from 'vue-router';
// import { checkVersion } from '@/plugins/pwa';

export const constantRoutes : RouteRecordRaw[] = [
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
                      hidden: true
                    }
                  }, 
                  {
                    path: 'list',
                    component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/campaign/campaign.vue'),
                    name: 'CampaignList',
                    meta: {
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
                visible: true,
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
                      hidden: true
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
                  },{
                    path: 'run/:id(\\d+)',
                    component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrun.vue'),
                    name: 'Runtask',
                    meta: {
                      title: 'Socialtask Run',
                      icon: 'list'
                    }
                  },{
                    path: 'taskrunlist/:id(\\d+)',
                    component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrunlist.vue'),
                    name: 'Task-run-list',
                    meta: {
                      title: 'Social task Run List',
                      icon: 'list'
                    }
                  }
            ]  
        },
        {
            path: '/componets',
            name: 'componets',
            meta: {
                visible: true,
                title: 'Componets',
                icon: 'mdi-cube-scan',
            },
            component: Layout,
            children: [
                {
                    path: 'samples',
                    name: 'Samples',
                    meta: {
                        title: 'Samples',
                        icon: 'mdi-alpha-s',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/sample.vue'),
                    children: [],
                },
                {
                    path: 'tables',
                    name: 'tables',
                    meta: {
                        title: 'Tables',
                        icon: 'mdi-alpha-t',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/componets/table.vue'),
                    children: [],
                },
            ],
        },   
        {
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login',
                icon: 'mdi-shield-account',
                visible: true,
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

