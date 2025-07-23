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
      icon: 'mdi-view-dashboard',
    },
    component: Layout,
    children: [

      {
        path: '/dashboard/home',
        name: 'home',
          meta: {
              title: 'route.home',
              icon: 'mdi-home',
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
      icon: 'mdi-cog',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'system_setting_index',
          meta: {
              title: 'route.system_setting',
              icon: 'mdi-cog',
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
      icon: 'mdi-bullhorn',
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
          icon: 'mdi-format-list-bulleted'
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
      icon: 'mdi-share-variant',
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
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'run/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrun.vue'),
        name: 'Runtask',
        meta: {
          title: 'route.run_task',
          icon: 'mdi-play'
        }
      }, {
        path: 'taskrunlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskrunlist.vue'),
        name: 'Task-run-list',
        meta: {
          title: 'route.task_run_list',
          icon: 'mdi-format-list-checks'
        }
      },
      {
        path: 'taskresultlist/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialtask/socialtaskresultlist.vue'),
        name: 'Task-result-list',
        meta: {
          title: 'route.task_result_list',
          icon: 'mdi-chart-line'
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
      icon: 'mdi-account-group'
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
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'editSocialAccount',
        meta: {
          visible: false,
          title: 'route.edit_account',
          icon: 'mdi-pencil'
        }
      },
      {
        path: 'add',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/socialaccount/socialaccountdetail.vue'),
        name: 'CreateSocialAccount',
        meta: {
          visible: false,
          title: 'route.add_account',
          icon: 'mdi-plus'
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
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'create',
        component: () => import('@/views/pages/schedule/create.vue'),
        name: 'CreateSchedule',
        meta: {
          visible: false,
          title: 'route.create_schedule',
          icon: 'mdi-plus'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/schedule/edit.vue'),
        name: 'EditSchedule',
        meta: {
          visible: false,
          title: 'route.edit_schedule',
          icon: 'mdi-pencil'
        }
      },
      {
        path: 'detail/:id(\\d+)',
        component: () => import('@/views/pages/schedule/detail.vue'),
        name: 'ScheduleDetail',
        meta: {
          visible: false,
          title: 'route.schedule_detail',
          icon: 'mdi-eye'
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
      icon: 'mdi-server-network'
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
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'editProxy',
        meta: {
          visible: false,
          title: 'route.edit_proxy',
          icon: 'mdi-pencil'
        }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/proxy/proxydetail.vue'),
        name: 'AddProxy',
        meta: {
          visible: false,
          title: 'route.add_proxy',
          icon: 'mdi-plus'
        }
      },
      {
        path: 'parse',
        component: () => import('@/views/pages/proxy/proxyparse.vue'),
        name: 'ParseProxy',
        meta: {
          visible: true,
          title: 'route.parse_proxy',
          icon: 'mdi-file-document-outline'
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
      icon: 'mdi-puzzle'
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
          icon: 'mdi-format-list-bulleted'
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
      icon: 'mdi-video'
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
          icon: 'mdi-download'
        }
      },
      {
        path: 'dowloadtasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/list.vue'),
        name: 'VideodownloadTasklist',
        meta: {
          visible: true,
          title: 'route.video_download_task_list',
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'videolist/:taskid(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/videoList.vue'),
        name: 'VideoList',
        meta: {
          visible: false,
          title: 'route.video_list',
          icon: 'mdi-playlist-play'
        }
      },
      {
        path: 'videodetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videodownload/detail.vue'),
        name: 'VideoDetail',
        meta: {
          visible: false,
          title: 'route.video_detail',
          icon: 'mdi-eye'
        }
      },
      {
        path: 'publish',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/videopublish/list.vue'),
        name: 'VideoPublishList',
        meta: {
          visible: true,
          title: 'route.video_publish_records',
          icon: 'mdi-upload'
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
      icon: 'mdi-magnify'
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
          icon: 'mdi-web'
        }
      },
      {
        path: 'tasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/search/resultlist.vue'),
        name: 'Searchtasklist',
        meta: {
          visible: true,
          title: 'route.search_task_list',
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'taskdetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/search/detaillist.vue'),
        name: 'Searchtaskdetail',
        meta: {
          visible: false,
          title: 'route.search_task_detail',
          icon: 'mdi-eye'
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
      icon: 'mdi-email-search'
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
          icon: 'mdi-email-plus'
        }
      },
      {
        path: 'tasklist',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailextraction/resultlist.vue'),
        name: 'Email_Extraction_list',
        meta: {
          visible: true,
          title: 'route.email_extraction_task_list',
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'taskdetail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailextraction/detaillist.vue'),
        name: 'Email_Extraction_Task_Detail',
        meta: {
          visible: false,
          title: 'route.email_extraction_detail',
          icon: 'mdi-eye'
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
      icon: 'mdi-email-multiple'
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
          icon: 'mdi-format-list-bulleted'
        }
      },
      {
        path: 'buckemailtask/list/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailSendTaskLog/list.vue'),
        name: 'BUCK_Email_TASK_LOG_LIST',
        meta:   {
          visible: false,
          title: 'route.email_send_log',
          icon: 'mdi-format-list-checks'
        }
      },
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/buckemailform.vue'),
        name: 'Email_BUCK_SEND',
        meta: {
          visible: false,
          title: 'route.sending_bulk_emails',
          icon: 'mdi-send'
        }
      },
      {
        path: 'template/list/',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatelist.vue'),
        name: 'Email_Marketing_Template_List',
        meta: {
          visible: true,
          title: 'route.email_template',
          icon: 'mdi-file-document-multiple'
        }
      },
      {
        path: 'template/detail/:id(\\d+)',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatedetail.vue'),
        name: 'Email_Marketing_Template_Detail',
        meta: {
          visible: false,
          title: 'route.email_template_detail',
          icon: 'mdi-eye'
        }
      },
      {
        path: 'template/create',
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailmarketing/template/templatedetail.vue'),
        name: 'Email_Marketing_Template_Create',
        meta: {
          visible: false,
          title: 'route.create_email_template',
          icon: 'mdi-plus'
        }
      },
      {
        path: 'emailfilter/list',
        name: 'Email_Marketing_Filter_LIST',
        meta: {
          visible: true,
          title: 'route.email_filter',
          icon: 'mdi-filter'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/list.vue'),
        
      },
      {
        path: 'emailfilter/create',
        name: 'Email_Marketing_Filter_Create',
        meta: {
          visible: false,
          title: 'route.email_filter_create',
          icon: 'mdi-plus'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/filterdetail.vue'),
        
      },
      {
        path: 'emailfilter/detail/:id(\\d+)',
        name: 'Email_Marketing_Filter_Detail',
        meta: {
          visible: false,
          title: 'route.email_filter_edit',
          icon: 'mdi-pencil'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailfilter/filterdetail.vue'),
        
      },
      {
        path: 'emailservice/list',
        name: 'Email_Marketing_Service_LIST',
        meta: {
          visible: true,
          title: 'route.email_service',
          icon: 'mdi-server'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailservice/list.vue'),
        
      },
      {
        path: 'emailservice/create',
        name: 'Email_Marketing_Service_Create',
        meta: {
          visible: false,
          title: 'route.email_service_create',
          icon: 'mdi-plus'
        },
        component: () => import(/* webpackChunkName: "staff-list" */ '@/views/pages/emailservice/servicedetail.vue'),
        
      },
      {
        path: 'emailservice/detail/:id(\\d+)',
        name: 'Email_Marketing_Service_Detail',
        meta: {
          visible: false,
          title: 'route.email_service_edit',
          icon: 'mdi-pencil'
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
      icon: 'mdi-login',
      visible: false,
    },
    component: () => import('@/views/pages/login/login.vue'),
  },
  { path: '/:pathMatch(.*)', name: 'Match', meta: { keepAlive: false }, redirect: '/404' },
  {
    path: '/404',
    name: '404',
    meta: { keepAlive: false, title: 'route.not_found', icon: 'mdi-alert-circle', visible: false },
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

