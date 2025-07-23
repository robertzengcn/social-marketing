import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout/layout.vue';
import { RouteRecordRaw } from 'vue-router';
// import { checkVersion } from '@/plugins/pwa';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/home',
    name: 'Dashboard',
    meta: {
      visible: false,
      title: 'route.dashboard',
      icon: 'mdi-gauge',
    },
    component: Layout,
    children: [

      {
        path: '/dashboard/home',
        name: 'home',
          meta: {
              title: 'route.home',
              icon: 'mdi-alpha-s',
              keepAlive: false,
              visible: false,
          },
          component: () => import('@/views/dashboard/home.vue'),
          children: [],
      }
    ],
  },
  {
    path: '/systemsetting',
    name: 'system_setting',
    meta: {
      visible: false,
      title: 'route.system_setting',
      icon: 'mdi-gauge',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'system_setting_index',
          meta: {
              title: 'route.system_setting',
              icon: 'mdi-alpha-s',
              keepAlive: false,
              visible: true,
          },
          component: () => import('@/views/pages/systemsetting/index.vue'),
          children: [],
      }
    ],
  },

  {
    path: '/campaign',
    name: 'campaign',
    meta: {
      visible: true,
      title: 'route.campaign',
      icon: 'mdi-cube-scan',
    },
    component: Layout,
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-edit" */ '@/views/pages/campaign/campaign.vue'),
        name: 'EditCampaign',
        meta: {
          title: 'route.edit_campaign',
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
          title: 'route.campaign_list',
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
      title: 'route.social_task',
      icon: 'mdi-cube-scan',
    },
    component: Layout,
    children: [
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-edit" */ '@/views/pages/socialtask/socialtaskdetail.vue'),
        name: 'EditSocialtask',
        meta: {
          title: 'route.edit_socialtask',
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

          title: 'route.create_socialtask',
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
          title: 'route.socialtask_list',
          icon: 'list'
        }
      },
      {
        path: 'run/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrun.vue'),
        name: 'Runtask',
        meta: {
          title: 'route.run_task',
          icon: 'list'
        }
      }, {
        path: 'taskrunlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrunlist.vue'),
        name: 'Task-run-list',
        meta: {
          title: 'route.task_run_list',
          icon: 'list'
        }
      },
      {
        path: 'taskresultlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskresultlist.vue'),
        name: 'Task-result-list',
        meta: {
          title: 'route.task_result_list',
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
      title: 'route.social_account',
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
          title: 'route.account_list',
          icon: 'list'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'editSocialAccount',
        meta: {
          visible: false,
          title: 'route.edit_account',
          icon: 'list'
        }
      },
      {
        path: 'add',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'CreateSocialAccount',
        meta: {
          visible: false,
          title: 'route.add_account',
          icon: 'list'
        }
      },
    ]
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: {
      visible: true,
      title: 'route.schedule',
      icon: 'mdi-clock-outline'
    },
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/pages/schedule/list.vue'),
        name: 'ScheduleList',
        meta: {
          visible: true,
          title: 'route.schedule_list',
          icon: 'list'
        }
      },
      {
        path: 'create',
        component: () => import('@/views/pages/schedule/create.vue'),
        name: 'CreateSchedule',
        meta: {
          visible: false,
          title: 'route.create_schedule',
          icon: 'add'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/schedule/edit.vue'),
        name: 'EditSchedule',
        meta: {
          visible: false,
          title: 'route.edit_schedule',
          icon: 'edit'
        }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/pages/schedule/detail.vue'),
        name: 'ScheduleDetail',
        meta: {
          visible: false,
          title: 'route.schedule_detail',
          icon: 'view'
        }
      }
    ]
  },
  {
    path: '/proxy',
    name: 'Proxy',
    meta: {
      visible: true,
      title: 'route.proxy',
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
          title: 'route.proxy_list',
          icon: 'list'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'editProxy',
        meta: {
          visible: false,
          title: 'route.edit_proxy',
          icon: 'list'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'AddProxy',
        meta: {
          visible: false,
          title: 'route.add_proxy',
          icon: 'list'
        }
      },
      {
        path: 'parse',
        component: () => import('@/views/pages/proxy/proxyparse.vue'),
        name: 'ParseProxy',
        meta: {
          visible: true,
          title: 'route.parse_proxy',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/extramodules',
    name: 'Modules',
    meta: {
      visible: true,
      title: 'route.modules',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/extramodules/extramoduleslist.vue'),
        name: 'Moduleslist',
        meta: {
          visible: true,
          title: 'route.modules_list',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/video',
    name: 'Video',
    meta: {
      visible: true,
      title: 'route.video',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'download',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/index.vue'),
        name: 'Videodownload',
        meta: {
          visible: true,
          title: 'route.video_download',
          icon: 'list'
        }
      },
      {
        path: 'dowloadtasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/list.vue'),
        name: 'VideodownloadTasklist',
        meta: {
          visible: true,
          title: 'route.video_download_task_list',
          icon: 'list'
        }
      },
      {
        path: 'videolist/:taskid(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/videoList.vue'),
        name: 'VideoList',
        meta: {
          visible: false,
          title: 'route.video_list',
          icon: 'list'
        }
      },
      {
        path: 'videodetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/detail.vue'),
        name: 'VideoDetail',
        meta: {
          visible: false,
          title: 'route.video_detail',
          icon: 'list'
        }
      },
      {
        path: 'publish',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videopublish/list.vue'),
        name: 'VideoPublishList',
        meta: {
          visible: true,
          title: 'route.video_publish_records',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      visible: true,
      title: 'route.search',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/search/index.vue'),
        name: 'Searchform',
        meta: {
          visible: true,
          title: 'route.search_scraper',
          icon: 'list'
        }
      },
      {
        path: 'tasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/search/resultlist.vue'),
        name: 'Searchtasklist',
        meta: {
          visible: true,
          title: 'route.search_task_list',
          icon: 'list'
        }
      },
      {
        path: 'taskdetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/search/detaillist.vue'),
        name: 'Searchtaskdetail',
        meta: {
          visible: false,
          title: 'route.search_task_detail',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/emailextraction',
    name: 'Email_Extraction',
    meta: {
      visible: true,
      title: 'route.email_extraction',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailextraction/index.vue'),
        name: 'Email_Extraction_Form',
        meta: {
          visible: true,
          title: 'route.email_extraction_form',
          icon: 'list'
        }
      },
      {
        path: 'tasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailextraction/resultlist.vue'),
        name: 'Email_Extraction_list',
        meta: {
          visible: true,
          title: 'route.email_extraction_task_list',
          icon: 'list'
        }
      },
      {
        path: 'taskdetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailextraction/detaillist.vue'),
        name: 'Email_Extraction_Task_Detail',
        meta: {
          visible: false,
          title: 'route.email_extraction_detail',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/emailmarketing',
    name: 'Email_Marketing',
    meta: {
      visible: true,
      title: 'route.email_marketing',
      icon: 'mdi-paw-off'
    },
    component: Layout, 
    children: [
      {
        path: 'buckemailtask/list/',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailsendtask/list.vue'),
        name: 'BUCK_Email_TASK_LIST',
        meta:   {
          visible: true,
          title: 'route.bulk_email_task_list',
          icon: 'list'
        }
      },
      {
        path: 'buckemailtask/list/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailSendTaskLog/list.vue'),
        name: 'BUCK_Email_TASK_LOG_LIST',
        meta:   {
          visible: false,
          title: 'route.email_send_log',
          icon: 'list'
        }
      },
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/buckemailform.vue'),
        name: 'Email_BUCK_SEND',
        meta: {
          visible: false,
          title: 'route.sending_bulk_emails',
          icon: 'list'
        }
      },
      {
        path: 'template/list/',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatelist.vue'),
        name: 'Email_Marketing_Template_List',
        meta: {
          visible: true,
          title: 'route.email_template',
          icon: 'list'
        }
      },
      {
        path: 'template/detail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatedetail.vue'),
        name: 'Email_Marketing_Template_Detail',
        meta: {
          visible: false,
          title: 'route.email_template_detail',
          icon: 'list'
        }
      },
      {
        path: 'template/create',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatedetail.vue'),
        name: 'Email_Marketing_Template_Create',
        meta: {
          visible: false,
          title: 'route.create_email_template',
          icon: 'list'
        }
      },
      {
        path: 'emailfilter/list',
        name: 'Email_Marketing_Filter_LIST',
        meta: {
          visible: true,
          title: 'route.email_filter',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/list.vue'),
        
      },
      {
        path: 'emailfilter/create',
        name: 'Email_Marketing_Filter_Create',
        meta: {
          visible: false,
          title: 'route.email_filter_create',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/filterdetail.vue'),
        
      },
      {
        path: 'emailfilter/detail/:id(\\d+)',
        name: 'Email_Marketing_Filter_Detail',
        meta: {
          visible: false,
          title: 'route.email_filter_edit',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/filterdetail.vue'),
        
      },
      {
        path: 'emailservice/list',
        name: 'Email_Marketing_Service_LIST',
        meta: {
          visible: true,
          title: 'route.email_service',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailservice/list.vue'),
        
      },
      {
        path: 'emailservice/create',
        name: 'Email_Marketing_Service_Create',
        meta: {
          visible: false,
          title: 'route.email_service_create',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailservice/servicedetail.vue'),
        
      },
      {
        path: 'emailservice/detail/:id(\\d+)',
        name: 'Email_Marketing_Service_Detail',
        meta: {
          visible: false,
          title: 'route.email_service_edit',
          icon: 'list'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailservice/servicedetail.vue'),
        
      },
      
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'route.login',
      icon: 'mdi-shield-account',
      visible: false,
    },
    component: () => import('@/views/pages/login/login.vue'),
  },
  { path: '/:pathMatch(.*)', name: 'Match', meta: { keepAlive: false }, redirect: '/404' },
  {
    path: '/404',
    name: '404',
    meta: { keepAlive: false, title: 'route.not_found', icon: 'mdi-paw-off', visible: false },
    component: Layout,
    children: [
      {
        path: '',
        name: 'd404',
        meta: {
          title: 'route.not_found',
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


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: constantRoutes
});


export default router;

