<template>
  
<div>
  <div class="columns box ">
      <div class="field custom-tag " v-for="typename of getTypeName">
            <b-tag v-if="isTag1Active"
                type="is-primary"
                closable
                @close="isTag1Active = false">
              {{typename}}
            </b-tag>
      </div>
   
     
    </div>
  <div class="columns is-mobile is-multiline has-text-centered">
    
    <div class="column customcol" v-for="game in games">
    <div  class=" customcard">
        <div class="custom-image-card" @click="gotoGame(game._id)">
              <img :src="game.Image_Cover" class="image_cover" >
        </div>
            <p class="text column">
              {{game.Views}} viewers
            </p>
            
            
              <div class="columns customtag is-multiline is-mobile" >
                  <button class="button is-small custombutton" v-for="(type,index) in game.Type" @click="fromTagz(type._id)" >{{type.Name}}</button>
              </div>
          
    </div>
    </div>
  </div>

  </div>
</template>

<script>
import axios from 'axios';
import {apiPath} from '../config';
export default {
  name: "GamesListByType"
  ,
  data(){
    return {
      games:[],
      typeName:[],
      isTag1Active: true,
    }
  },
  computed:{
    getGame(){
      
    },
    getTypeName(){
      this.typeName= this.$store.getters.type_name;
      return this.typeName;
    }
 
  },
  beforeCreate(){
    axios.get(`${apiPath.api}/game_types/${this.$store.getters.type_id}`)
    .then(res=>{
      
      if(res.data) {
        this.$store.commit('SET_TYPE_NAME',res.data.Name);
      }
    });

    

    axios.get(`${apiPath.api}/games/type/${this.$store.getters.type_id}`).then(({data})=>{

      if(data){
       
        this.games = data;
      }
    })
    
  }

  ,
  methods:{
    gotoGame(gameId){
      this.$router.push({ path: '/directory/game/'+gameId});
    },
    fromTagz(type_id){
            this.$router.push({ path: '/directory/type/'+type_id});
          }
  },
}
</script>

<style lang="css" scoped>
.image_cover{
  min-width: 200px;
  min-height: 270px;
  max-width: 200px;
  max-height: 270px;
  border-radius: 5px;
  margin:auto;
}
.customcol{
  max-width: 220px;

}
.custom-tag{
  margin-left: 1%;
}
.customcard{
  min-width: 200px;
  max-width: 260px;
  border-radius :5px;
}
.custom-image-card:hover{
  cursor: pointer;
  
  
}
.text{
  font-size: 13px;
  text-align: left;
}
.customtag{
  margin-left: 1%;
  padding-bottom: 1%;
}
.custombutton{
  text-align: center;
  max-height:30px;
  max-width: 90px;
  margin-left: 1%;

}
</style>

