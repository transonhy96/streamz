<template>
  <div  class="column">
 
        <div class="columns game box">
           
          <div class="custom-image-card column is-2">
                <img :src="game.Image_Cover" class="image_cover" >
          </div>
          <div class="column is-10">
                <h1>{{game.FullName}}</h1>
                <p class="text">
                {{game.Views}} viewers
                </p>
              
              
                <div class="section customtag is-multiline is-mobile" >
                          <button class="button is-small custombutton" v-for="(type,index) in game.Type" @click="fromTags(type._id)">{{type.Name}}</button>
                </div>
                
          </div>
          
      </div>
      <div class="columns channel">
         <section class="section" v-if="!getEmpty(channels)">There's no live channel of this games</section>
          <div class="column channel-custom" v-for="channel of channels">

               <a class="">
                  <img :src="channel.VideoPlayer_Banner" alt="" @click="gotoStream(channel.Username)">
                </a>
           <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="channel.Profile_Picture">
                </p>
              </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{channel.Live_Title}}</strong>
                    </p>
                  </div>
                  <div class="content">
                    <p>
                      <button class="button"><strong>{{channel.Username}}</strong></button> 
                    </p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left">
                      
                      <a class="level-item ">
                          <p class="is-small">{{channel.Language}}</p>
                      </a>
                      
                    </div>
                  </nav>
                </div>
        </article>

          </div>
      </div>
  </div>
</template>
<script>

import axios from 'axios';
import {apiPath} from '../config';
export default {
  name:"channellist",
  data(){
    return {
      game:{},
      channels:{}
    }
  },
  computed:{
    
  },
  methods:{
    getEmpty(data){
      if(!data || data.length == 0){
        return false;
      }
      return true;
    },
    fromTags(type_id){
      this.$router.push({ path: '/directory/type/'+type_id});
    }
    ,
    gotoStream(displayName){

       this.$router.push({ path: '/channel/stream/'+displayName});
    }
  },
  created(){
    this.id = this.$route.params['id'];
  
    axios.get(`${apiPath.api}/games/game_id/${this.id}`)
    .then(res=>{
    
      this.game = res.data;
    });

    axios.get(`${apiPath.api}/channels/game_id/${this.id}`)
    .then(({data})=>{
      console.log(data);
       this.channels = data.channel;

    })
  }
  
}
</script>
<style scoped>
.image_cover{
  min-width: 130px;
  min-height: 175px;
  max-width: 130px;
  max-height: 175px;
  border-radius: 3px;
  margin:auto;
}
.game{
  background: rgba(0, 0, 0, 0.1);
}
.customcol{
  max-width: 220px;

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
  padding-bottom: 1%;
}
.custombutton{
  text-align: center;
  max-height:30px;
  max-width: 90px;

}
.channel{
  margin-top: 2%;
}
.channel-custom{
  max-width: 340px;
  max-height: 200px;
}
</style>
