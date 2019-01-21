import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';
import AccountPage from '@/pages/Account/Account';
// Charts
//import ChartsPage from '@/pages/Charts/Charts';
import ChannelsPage from '@/pages/Channels/Channels';
import EditGamePage from '@/pages/Games/EditGame';
import GamesPage from '@/pages/Games/Games';
import DetailPage from '@/pages/Channels/Detail';
import GenresPage from '@/pages/Genre/Genre';

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';


Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        "requiresAuth": false
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
      meta: {
        "requiresAuth": false
      }
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      meta: {
        "requiresAuth": true
      },
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'account',
          name: 'AccountPage',
          component: AccountPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/channels',
          name: 'ChannelsPage',
          component: ChannelsPage,
          meta: {
            "requiresAuth": true
          }
        },

        {
          path: 'components/channels/:name',
          name: 'DetailPage',
          component: DetailPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/genres',
          name: 'GenresPage',
          component: GenresPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/games',
          name: 'GamesPage',
          component: GamesPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/games/:method',
          name: 'EditGamePage',
          component: EditGamePage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
          meta: {
            "requiresAuth": true
          }
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
          meta: {
            "requiresAuth": true
          }
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  
  if (to.meta.requiresAuth) {
    
    if (window.localStorage.getItem("authenticated") === 'true') {
      
      next();
      
    }
    else {
      next('/login');
    }
  }
  else {
    next();
  }



});

export default router;
