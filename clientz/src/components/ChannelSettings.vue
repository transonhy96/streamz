<template>
  
<div class="columns ">
        <b-notification ref="element" :closable="false">            
                        
        <div class="container">
          
          <div class="section">
            <div class="field">
              Stream Key & Preferences
            </div>
            <div class="box">
              Primary Stream key
              
                <b-field>
                  <form action="">
                    <p class="control has-icons-right">
                      
                        <input class="input" 
                      v-model="channel.StreamKey"
                       :type="type"> 
                      
                      <span class=" icon is-small is-right">
                        <i class="fas fa-eye"></i>
                      </span>
                      
                    </p>
                    </form>
                </b-field>
                
                <a class="button is-primary" @click="uncover">
                  {{buttonz}}
                </a>
            
            </div>
            <div class="box">
              Broadcast Path
              
                <b-field>
                  <form action="">
                    <p class="control has-icons-right">
                      
                        <input class="input" 
                        value="http://34.221.82.77/live/"
                       :type="type"> 
                      
                      <span class=" icon is-small is-right">
                        <i class="fas fa-eye"></i>
                      </span>
                      
                    </p>
                    </form>
                </b-field>
              
            </div>
            <p>Video Player Banner</p>
            <div class="box">
              <div class="columns">
                <div class="column is-4">
                  <img :src="getVideCover" alt="" style="witdth:440px;height:140px;">
                </div>
                <div class="column is-8">
                  <b-field class="file">
                          <b-tooltip label="File format: JPEG, PNG, GIF (max size 256x256, 10MB)"
                              position="is-bottom">
                            <div class="file is-boxed">
                                <label class="file-label">
                                  <input class="file-input"
                                  :class="{'is-loading':isUpload}" 
                                  @change="loadFiles" 
                                  accept="image/*" type="file" 
                                  name="resume">
                                  <span class="file-cta">
                                    <span class="file-icon">
                                      <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                      Choose a file…
                                    </span>
                                  </span>
                                </label>
                              </div>
                          
                          </b-tooltip>
                          
                    
                          
                      </b-field>
                </div>
              </div>
              
            </div>
          </div>
          </div>  

        </b-notification>                    
</div>
</template>
<script>


import uploadImg from '../_helper/uploadToImgur';
import axios from 'axios';
import {apiPath} from '../config';
import warningModal from './WarningModal.vue';

export default {
  name:'channelsettings',
  components:{
    warningModal

  },
  data(){
    return {
      file:null,
      url:null,
      isChangeImage:false,
      channel:{},
      isUpload:false,
      type:'password',
      buttonz:'Show'
    }
  },
  methods:{
    loadFiles(event){

      if(event.target.files[0])
      {
        const loadingComponent = this.$loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
      });
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(event.target.files[0]);
      uploadImg(this.file).then(({data})=>{
        let link = data.data.link
        axios({
              url:`${apiPath.api}/channels/VideoPlayer_Banner/${this.channel._id}`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
              data:{
                VideoPlayer_Banner:link
              }
            })
       
            .then(res=>{
              loadingComponent.close();
            })
        
      })
      }
    },
    uncover(){
      
      if(this.type ==='password'){
        this.$snackbar.open({
                    message: 'Do not show your streamkey to any body',
                    type: 'is-warning',
                    position: 'is-top',
                    actionText: 'I understand!',
                    indefinite: true,
                    onAction: () => {
                        this.type = 'text';
                        this.buttonz = 'Hide'
                    }
                })
    
        
      }
      else if(this.type==='text'){
        this.type ='password';
        this.buttonz = 'Show';
      }
    }
  }
  ,computed:{
    getVideCover(){
      return this.url;
    }
    ,
  },
  beforeCreate(){
    let username =this.$store.getters.users.username;

    axios({
      url:`${apiPath.api}/channels/username/${username}`,
      headers:{'x-access-token':localStorage.getItem('token')},
      method:"GET"
    })
    .then(res=>{

      
      this.channel = res.data;
      
      this.url = res.data.VideoPlayer_Banner;
    })
    .catch(err=>{

    });
  }
}
</script>
