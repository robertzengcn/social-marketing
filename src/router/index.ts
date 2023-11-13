import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/layout.vue';
import {RouteRecordRaw } from 'vue-router';
// import { checkVersion } from '@/plugins/pwa';

export const constantRoutes : RouteRecordRaw[] = [
    {
            path: '/',
            redirect: '/dashboard/campaign',
            name: 'Dashboard',
            meta: {
                visible: true,
                title: 'Dashboard',
                icon: 'mdi-gauge',
            },
            component: Layout,
            children: [
                {
                    path: '/dashboard/smart-house',
                    name: 'smartHouse',
                    meta: {
                        title: 'Smart House',
                        icon: 'mdi-alpha-s',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/smartHouse.vue'),
                    children: [],
                },
                {
                    path: '/dashboard/campaign',
                    name: 'Campaign',
                    meta: {
                        title: 'Campaign',
                        icon: 'mdi-alpha-s',
                        keepAlive: false,
                        visible: true,
                    },
                    component: () => import('@/views/dashboard/campaign.vue'),
                    children: [],
                }
            ],
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
            component: () => import('@/views/login/login.vue'),
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

