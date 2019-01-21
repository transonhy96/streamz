<template>
  <div class="columns is-mobile is-multiline has-text-centered">
    <template>
      <div class="column customcol" v-for="game in getGame">
      <div class="customcard">
        <div class="custom-image-card" @click="gotoGame(game._id)">
          <v-lazy-image 
          :src="game.Image_Cover" class="image_cover"/>
        </div>
        <b-tooltip :label="game.FullName" position="is-bottom" dashed>
          {{game.ShortName}}
        </b-tooltip>
        <p class="text column">{{game.Views}} viewers</p>

        <div class="columns customtag is-multiline is-mobile">
          <button
            class="button is-small custombutton"
            v-for="(type,index) in game.Type"
            @click="fromTaggs(type)"
          >{{type.Name}}</button>
        </div>
      </div>
    </div>
    </template>
   
  </div>
</template>

<script>
import axios from "axios";
import { apiPath } from "../config";
import VLazyImage from "v-lazy-image";
import request from "../_helper/request"; 
export default {
  name: "GamesList_C",
  components:{
    VLazyImage
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {},
  computed: {
    getGame() {
      return this.$store.getters.filter_games;
    },
    checkEmpty(){
       if(this.$store.getters.type.length >0){
        return true;
      }
      return false;
    }
  },
  methods: {
    gotoGame(gameId) {
      axios.patch(`${apiPath.api}/games/increase/${gameId}`);
      this.$router.push({ path: "/directory/game/" + gameId });
    },
    fromTaggs(type) {
      this.$store.commit('SET_FILTER_GAMES',{_id:type._id,Name:type.Name});
     
    }
  },
  created(){
    request("GET", "/games", {}).then(res => {
      if (res.data) {
        this.$store.commit("SET_GAMES", res.data);
      }
    });
  }
};
</script>

<style lang="css" scoped>
.image_cover {
  min-width: 200px;
  min-height: 270px;
  max-width: 200px;
  max-height: 270px;
  border-radius: 5px;
  margin: auto;
}
.customcol {
  max-width: 220px;
}
.customcard {
  min-width: 200px;
  max-width: 260px;
  border-radius: 5px;
}
.custom-image-card:hover {
  cursor: pointer;
}
.text {
  font-size: 13px;
  text-align: left;
}
.customtag {
  margin-left: 1%;
  padding-bottom: 1%;
}
.custombutton {
  text-align: center;
  max-height: 30px;
  max-width: 90px;
  margin-left: 1%;
  border-style: dashed;
}
.v-lazy-image {

  filter: blur(5px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}
</style>

