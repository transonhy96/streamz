<template>
    
        <GamesListByType/> 

</template>

<script>
import GamesListByType from '@/components/GamesListByType'
export default {
   
  name: 'GLByType',
  components:{
    GamesListByType
  },
  data(){
    return{
     
    }
  },
  created(){
    this.$store.commit("SET_GAME_TYPE_ID",this.$route.params['id']);
  }
  ,methods:{
    fromTagz(type_id){
            this.$router.push({ path: '/directory/type/'+type_id});
          }
  }
  
}
</script>
<style scoped>


</style>

