
export default function protect(next){
    console.log('enter this protected route')
  if(this.$store.getters.token===''){
    
    this.$router.push({path:'/directory'});
  }
  next();
  
}