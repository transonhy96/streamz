<template>
    <div class="hero">
      <div class="columns">
              <div class="column is-2 ">
                
                <aside class="menu box">
                    <p class="menu-label">
                      DASHBOARD
                    </p>
                    <ul class="menu-list">
                      <li><a :class="{'is-active':active_el==1}" @click="setActive(1)">Live</a></li>
                      <!-- <li><a :class="{'is-active':active_el==2}" @click="setActive(2)">Extentions</a></li>
                      <li><a :class="{'is-active':active_el==9}" @click="setActive(9)">Achievements</a></li>
                      <li><a :class="{'is-active':active_el==11}" @click="setActive(11)">Events</a></li>
                      <li><a :class="{'is-active':active_el==12}" @click="setActive(12)">Activity</a></li> -->
                      <li><a :class="{'is-active':active_el==10}" @click="setActive(10)">Stream Tools</a></li>
                    </ul>
                    <p class="menu-label">
                      SETTINGS
                    </p>
                    <ul class="menu-list">
                      <li><a :class="{'is-active':active_el==3}" @click="setActive(3)">Channel</a></li>
                      <!-- <li><a :class="{'is-active':active_el==4}" @click="setActive(4)">Permission</a></li>            -->
                    </ul>
                    <p class="menu-label">
                     ANALYTICS
                    </p>
                    <ul class="menu-list">
                      <li><a :class="{'is-active':active_el==6}" @click="setActive(6)">Channel</a></li>
                      <li><a :class="{'is-active':active_el==7}" @click="setActive(7)">Stream Summary</a></li>
                      <li><a :class="{'is-active':active_el==8}" @click="setActive(8)">Balance</a></li>
                    </ul>
                    <p class="menu-label">
                     VIDEOS
                    </p>
                    <ul class="menu-list">
                      <li><a :class="{'is-active':active_el==13}" @click="setActive(13)">Video Producer</a></li>
                      <li><a :class="{'is-active':active_el==14}" @click="setActive(14)">Collections</a></li>
                      <li><a :class="{'is-active':active_el==15}" @click="setActive(15)">Clips</a></li>
                    </ul>
              </aside>
              </div>
              <div class="column is-10 ">

                  <router-view>

                  </router-view>


              </div>
      </div>
      
    </div>
    
</template>
<script>
import draggable from 'vuedraggable'
import flvjs  from 'flv.js';
export default {
  name: "dashboard",
  components:{
    draggable,
  },
  data(){
    return{
      active_el:1,
      
    }
  },
  computed:{
    getActive(){
      return this.active;
    }
  },
  methods:{
    setActive(e){
      this.active_el = e;
      switch(e){
        case 1:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard`});
          break;
        case 2:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/extentions`});
          break;
        case 3:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/channel_settings`});
          break;
        case 4:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/channel_permission`});
          break;
        case 5:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard`});
          break;
        case 6:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/channel_analitic`});
          break;
        case 7:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/stream_sum`});
          break;
        case 8:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/balance`});
          break;
        case 9:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/achievements`});
          break;
        case 10:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/stream_tools`});
          break;
        case 11:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/events`});
          break;
        case 12:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/activity`});
          break;
        case 13:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/video_producer`});
          break;
        case 14:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/collections`});
          break;
        case 15:
          this.$router.push({path:`/${this.$store.getters.users.username}/dashboard/clips`});
          break;
      }
      
      
    }
  }
  ,
  mounted(){
  let video = this.$refs['videoPreview'];
    
  }
};
</script>
<style scoped>
.menu-list{
  list-style: none;
}
.menu-list>li>a:hover{
  background: rgba(0,0,0,0.3);
}
.menu-label{
  margin-left: 10%;
}

</style>
