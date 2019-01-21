
export default function getHeader(){
    if(localStorage.getItem('token')){
      return {header:{'x-access-token':localStorage.getItem('token')}};
    }
    else{
      return {};
    }
    
    
}