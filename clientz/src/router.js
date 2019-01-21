import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "browse" */ './views/Home.vue'),
      meta: {
        guest: true
      },

    },
    {
      path: '/getstart',
      name: 'getstart',
      component: () => import('./views/GetStart.vue'),
      meta: {
        guest: true
      },
    },
    {
      path: '/:username/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "browse" */ './views/DashBoard.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'live',
          component: () => import('./components/Live.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'extentions',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'channel_settings',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'channel_permission',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'channel_analitic',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'stream_tools',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'stream_sum',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'activity',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'balance',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'achievements',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'events',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'collections',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'video_producer',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
        ,
        {
          path: 'clips',
          name: 'channelsettings',
          component: () => import('./components/ChannelSettings.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]

    },
    {
      path: '/directory',
      name: 'directory',
      component: () => import(/* webpackChunkName: "browse" */ './views/Directory.vue'),
      children: [
        {
          path: '/',
          name: 'gamelist',
          component: () => import(/* webpackChunkName: "browse" */ './components/GamesList.vue'),
          meta: {
            guest: true
          }

        },
        {
          path: 'all',
          name: 'livechannel',
          component: () => import(/* webpackChunkName: "browse" */ './components/LiveChannels.vue'),
          meta: {
            guest: true
          }

        },
        {
          path: 'game/:id',
          name: 'channellist',
          component: () => import(/* webpackChunkName: "browse" */ './views/ChannelList.vue'),
          meta: {
            guest: true
          }

        },
        {
          path: 'type/:id',
          name: 'glbytype',
          component: () => import(/* webpackChunkName: "browse" */ './views/GLByType.vue'),
          meta: {
            guest: true
          }

        }
        ,
        {
          path: 'channel/:name/settings',
          name: 'setting',
          component: () => import(/* webpackChunkName: "browse" */ './views/Settings.vue'),
          meta: {
            requiresAuth: true
          }


        }

      ]
    },
    {
      path:'/channel',
      name:'channel',
      component: ()=>import('./views/Channel.vue'),
      meta:{
        guest:true
      },
      children:[
        {
          path: 'stream/:name',
          name: 'stream',
          component: () => import(/* webpackChunkName: "browse" */ './views/Stream.vue'),
          meta: {
            guest: true
          }
    
        }
      ]
    }


  ]
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (localStorage.getItem('token') == '') {
//           next({
//               path: '/directory',
//               params: { nextUrl: to.fullPath }
//           })
//       } else if(to.matched.some(record => record.meta.guest)) {

//       next();
//   }
// }
// else{
//   next();
// }
// })


export default router;