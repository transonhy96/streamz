import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {

      username: ''
    },
    filter_num: 0,
    userId: '',
    friend:[],
    following:[],
    token: '',
    games: [],
    filter_games: [],
    type_id: '',
    type: [],
    streamKey: ''
  },
  getters: {
    users(state) {
      return state.user;
    },
    friend(state) {
      return state.follower;
    },
    following(state) {
      return state.following;
    },
    userId(state) {
      return state.userId;
    },
    streamKey(state) {

      return state.streamKey;
    },
    token(state) {
      return state.token;
    },
    games(state) {
      return state.games;
    },
    type_id(state) {
      return state.type_id;
    },
    type(state) {
      return state.type;
    },
    filter_games(state) {
      if (_.size(state.type) == 0) {
        return state.games;
      }
      return state.filter_games;
    }

  },
  mutations: {
    SET_CURRENT_USER: (state, payload) => {
      state.user.username = payload.user.username;
    },
    SET_FOLLOWING: (state, payload) => {
      state.following = payload;
    },
    SET_FRIEND: (state, payload) => {
      state.friend = payload;
    },
    SET_CURRENT_USERID: (state, payload) => {
      state.userId = payload.userId;
    },
    SET_GAME_TYPE: (state, payload) => {

      state.type_id = payload;

    },

    SET_STREAM_KEY: (state, payload) => {

      state.streamKey = payload;

    },
    REMOVE_TYPE: (state) => {
      state.type =[];
      state.filter_num=0;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_GAMES: (state, payload) => {
      state.games = payload;
    }
    ,
    SET_FILTER_GAMES: (state, payload) => {
      if (_.size(state.type) > 0) {
        var isMatch = false;
        _.forEach(state.type, (e => {

          if (e._id == payload._id) {
            isMatch = true;

          }
        }));
        if (!isMatch) {
          state.type.push(payload);
        }

      }
      else {
        state.type.push(payload);
      }

      let filter = [];
      if (state.filter_num > 0) {
        filter = state.filter_games;
      }
      else {
        filter = state.games;
      }
      state.filter_games = _.filter(filter, (op => {
        let has = false;
        _.forEach(op.Type, el => {
          if (el._id == payload._id) {
            has = true;
          }
        });
        return has;
      }));
      state.filter_num++;
    }
  },
  actions: {
    setCurrentUser(ctx, payload) {
      ctx.commit("SET_CURRENT_USER", payload);
    },
    setToken(ctx, payload) {
      ctx.commit("SET_TOKEN", payload);
    }
  }
})
