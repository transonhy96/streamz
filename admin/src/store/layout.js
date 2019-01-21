import $ from 'jquery';
import isScreen from '@/core/screenHelper';



export default {
  namespaced: true,
  state: {
    sidebarClose: false,
    sidebarStatic: false,
    sidebarActiveElement: null,
    chatOpen: false,
    auth:false,
    pointedChannel:[],
    pointedGame:[],
    userId:'',
    action:'',
    email:''
    
    
  },
  getters:{
    getPointedChannel(state){
      return state.pointedChannel;
    },
    getEmail(state){
      return state.email;
    },
    getPointedGame(state){
      return state.pointedGame;
    },
    getAuth(state){
      return state.auth;
    },
    getUser(state){
      return state.userId;
    },
    getAction(state){
      return state.action;
    },
  },
  mutations: {    
    setPointedChannel(state,payload){
      state.pointedChannel = payload;
    },
    setUser(state,payload){
      state.userId = payload;
    },
    setEmail(state,payload){
      state.email = payload;
    },
    setAction(state,payload){
      state.action = payload;
    },
    setAuth(state,payload){
      state.auth = payload;
    },
    setPointedGame(state,payload){
      state.pointedGame = payload;
    },
    toggleChat(state) {
      state.chatOpen = !state.chatOpen;
      $('.chat-notification-sing').remove();

      setTimeout(() => {
      // demo: add class & badge to indicate incoming messages from contact
      // .js-notification-added ensures notification added only once
        $('#chat-sidebar-user-group').find('.list-group-item:first-child:not(.js-notification-added)')
          .addClass('active js-notification-added')
          .find('.fa-circle')
          .after('<span class="badge badge-danger badge-pill '
          + 'float-right animated bounceInDown">3</span>');
      }, 1000);
    },
    toggleSidebar(state) {
      const nextState = !state.sidebarStatic;

      localStorage.sidebarStatic = nextState;
      state.sidebarStatic = nextState;

      if (!nextState && (isScreen('lg') || isScreen('xl'))) {
        state.sidebarClose = true;
      }
    },
    switchSidebar(state, value) {
      if (value) {
        state.sidebarClose = value;
      } else {
        state.sidebarClose = !state.sidebarClose;
      }
    },
    setSidebarState(state, value) {
      state.sedebarClose = value;
    },
    handleSwipe(state, e) {
      if (e.direction === 4 && !state.chatOpen) {
        state.sidebarClose = false;
      }

      if (e.direction === 2 && !state.sidebarClose) {
        state.sidebarClose = true;
        return;
      }

      state.chatOpen = e.direction === 2;
    },
    changeSidebarActive(state, index) {
      state.sidebarActiveElement = index;
    },
  },
  actions: {
    toggleChat({ commit }) {
      commit('toggleChat');
    },
    toggleSidebar({ commit }) {
      commit('toggleSidebar');
    },
    switchSidebar({ commit }, value) {
      commit('switchSidebar', value);
    },
    handleSwipe({ commit }, e) {
      commit('handleSwipe', e);
    },
    changeSidebarActive({ commit }, index) {
      commit('changeSidebarActive', index);
    },
    setPointedChannel({commit}){
      commit('setPointedChannel');
    }
  },
};
