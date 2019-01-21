// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'expose-loader?jQuery!jquery' // eslint-disable-line
import 'expose-loader?$!jquery' // eslint-disable-line
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTouch from 'vue-touch';
import Trend from 'vuetrend';

import store from './store';
import router from './Routes';
import App from './App';
import axios from 'axios'

const base = axios.create({
  baseURL: 'http://localhost:3000/',

})
Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(Trend);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created: function () {
    axios({
      method: "POST",
      url: "http://localhost:3000/api/validateToken/admin",
      headers: {
        "x-access-token": window.localStorage.getItem("token_admin")
      },
      data: {
        "token": window.localStorage.getItem("token_admin")
      }
    }).then(({ data }) => {
      
      if (data.admin) {
       this.$store.commit("layout/setAuth", true);
       window.localStorage.setItem("authenticated", true);
       this.$router.push('/app/dashboard');
       
      }
      else{
        this.$store.commit("layout/setAuth", false);
        window.localStorage.setItem("authenticated", false);
        this.$router.push('/login');
        
      }

    }).catch(() => {
      this.$store.commit("layout/setAuth", false);
      window.localStorage.setItem("authenticated", false);
      this.$router.push('/login');
      
    });
  }
});

Vue.prototype.$http = base;