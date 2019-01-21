<template>
  <div class="wrapper ">
    <b-notification ref="element" :closable="false">
    <b-tabs type="is-boxed" >
        <b-tab-item>
            <template slot="header">
                <b-icon pack="fas" icon="user-circle"></b-icon>
                <span>Profile</span>
            </template>
            <section class="section">
              <div class="container">
                <p class="title">Your Profile</p>
                
                Profile Picture
                <div class="box">
                  <div class="columns">               
                      
                    <div class="column is-2">
                      <img :src="getProfilePic" alt="" style="witdth:140px;height:140px;">
                      
                    </div>
                    <div class="column is-10">
                        <b-field class="file">
                          <b-tooltip label="File format: JPEG, PNG, GIF (max size 256x256, 10MB)"
                              position="is-bottom">                             
                                <div class="file is-boxed">
                                <label class="file-label">
                                  <form>
                                  <input class="file-input"                            
                                  @change="loadFile" 
                                  accept="image/*" type="file" 
                                  name="resume">
                                  </form>
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
            </section>
            <section class="section">
              <div class="container">
                Profile Banner
                <div class="box">          
                  <div class="columns">
                    <div class="column is-4">
                      <img :src="getBannerPic" alt="" style="witdth:440px;height:140px;">
                    </div>
                    <div class="column is-8">
                        <b-field class="file">
                          <b-tooltip label="File format: JPEG, PNG, GIF (max size 256x256, 10MB)"
                              position="is-bottom">
                            <div class="file is-boxed">
                                <label class="file-label">
                                  <input class="file-input" 
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
            </section>
            <section class="section">
              <div class="container">
                Profile Settings
                <div class="box">
                    <b-field label="Email">
                        <b-input :value="channel.Email"
                          disabled="true"
                        >
                        </b-input>
                    </b-field>
                    <b-field label="Enable additional account creation">
                        <div class="field">
                              <b-switch :value="true">
                                  
                              </b-switch>
                          </div>
                    </b-field>
                    <b-field label="Username">
                        <b-input :value="channel.Username" 
                        placeholder="Username"></b-input>
                    </b-field>
                    <b-field label="Bio">
                        <textarea  class="textarea"                        
                        v-model="bio" 
                        placeholder="Who you are in fewer than 300 charactors">
                        </textarea>
                    </b-field>
                    <b-field >
                        <button class="button is-primary" @click="uploadImage">
                        
                          <span>Save</span>
                        </button>
                    </b-field>
                </div>
              </div>
            </section>
        </b-tab-item>
        <b-tab-item>
            <template slot="header">
                <b-icon pack="fas" icon="video"></b-icon>
                <span> Channel</span>
            </template>
             <section class="section">
              <div class="container">
                        <p class="title">Channel</p>

                        <div class="box">
                          <b-field label="Mature content">
                                  <div class="field">
                                    
                                      <b-switch v-model="mature" @change.native="setMature">
                                          Mature Content
                                      </b-switch>
                                      
                                      
                                    </div>
                          </b-field>
                    <b-field label="Video Player Banner">
                        <div class="field">
                              <button class="button is-primary">
                        
                                      <span>Go to Dashboard</span>
                                    </button>
                          </div>
                    </b-field>
                    <b-field label="My Teams">
                       
                    </b-field>
                    
                    </div>
              </div>
            </section>
        </b-tab-item>
        <b-tab-item>
            <template slot="header">
                <b-icon pack="fas" icon="shield-alt"></b-icon>
                <span> Security</span>
            </template>
            
            <section class="section">
              <div class="container">
                        <p class="title">Security</p>
                        <p class="heading">Keep your account safe and sound</p>
                        <div class="box">
                          <b-field label="Password">
                            <b-input type="password"
                                value="*********"
                                >
                            </b-input>
                          <template >
                          </template> 
                          </b-field>
                            <div class="field">
                              <span class="column">Change your password</span>
                                  <button class="button is-primary is-right">
                            
                                          <span>Change</span>
                                        </button>
                              </div>
                          
                        </div>
                        <p class="heading">Privacy</p>
                        <div class="box">
                          <b-field label="Block Whispers from Strangers">
                            <div class="field">
                                <div class="columns">
                                  <div class="column">
                                    
                                  </div>
                                </div>
                                  
                              
                            </div>
                          </b-field>
                        </div>
              
              </div>
            </section>
        </b-tab-item>
        <b-tab-item>
            <template slot="header">
                <b-icon pack="fas" icon="bell"></b-icon>
                <span> Notifications</span>
            </template>
             <section class="section">
              <div class="container">
                        <p class="title">Notifications</p>      
              </div>
            </section>
              <div class="field">
                <b-switch v-model="notification" @change.native="changeNotification">
                    Enable Notifications
                </b-switch>
                
              </div>
              
              
        </b-tab-item>
    </b-tabs>
    
            
        </b-notification>
  </div>
</template>
<script>
import axios from 'axios';
import {apiPath} from '../config';
import protect from '../_helper/protectRoute';
import uploadImg from '../_helper/uploadToImgur';
export default {
  name:'setting',
  components:{
    
  },
  data(){
    return{
      file1:null,
      file2:null,
      link1:null,
      link2:null,
      bio:'',
      notification:null,
      mature:null,
      username:'',
      channel:{},
      Profile_Picture:'',
      Profile_Banner:'',
      data:null,
      isChangeImage1:false,
      isChangeImage2:false,
      
    }
  },
  beforeEnter: (to, from, next) => {
              protect(next);
  },
  beforeCreate(){
    let username =this.$store.getters.users.username;
    axios({
      method:'GET',
      headers:{'x-access-token':this.$store.getters.token},
      url:`${apiPath.api}/channels/username/${username}`
    })
    .then(res=>{
      console.log(res.data)
      this.channel = res.data;
      this.bio = res.data.Bio;
      this.notification = res.data.Notification;
      this.mature  = res.data.Mature_Content;
    })
    .catch(err=>{

    });

  },
  methods:{
    loadFile(event){
      this.file1 = event.target.files[0];
      this.channel.Profile_Picture = URL.createObjectURL(event.target.files[0]);
      console.log(this.channel.Profile_Picture);
      this.isChangeImage1 = true;
    },
    loadFiles(e){
      this.file2 = event.target.files[0];
      this.channel.Profile_Banner =URL.createObjectURL(event.target.files[0]);
      this.isChangeImage2 = true;
    }
    ,
    uploadImage(){
      
      const loadingComponent = this.$loading.open({
                    container: this.isFullPage ? null : this.$refs.element.$el
      });
      if(this.isChangeImage1 && this.isChangeImage2){
        uploadImg(this.file1).then(({data})=>{
          this.link1 = data.data.link;
          uploadImg(this.file2).then(({data})=>{
            this.link2 = data.data.link;
            axios({
              url:`${apiPath.api}/channels/${this.channel._id}/profile_setting`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
              data:{
              Profile_Picture:this.link1,
              Profile_Banner:this.link2,
              Bio:this.bio
              }
            })
            .then(res=>{
                
            });
          });

          loadingComponent.close();
        });
      }
      else if(this.isChangeImage1 && !this.isChangeImage2){
        uploadImg(this.file1).then(({data})=>{
          this.link1 = data.data.link;
            
            axios({
              url:`${apiPath.api}/channels/${this.channel._id}/profile_setting`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
              data:{
              Profile_Picture:this.link1,
              Bio:this.bio
              }
            })
           .then(res=>{
                
            });
          loadingComponent.close();
          })
      }
      else if( !this.isChangeImage1 &&  this.isChangeImage2){
        uploadImg(this.file2).then(({data})=>{
          this.link2 = data.data.link;
            axios({
              url:`${apiPath.api}/channels/${this.channel._id}/profile_setting`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
              data:{
              Profile_Banner:this.link2,
              Bio:this.bio
              }
            })
            .then(res=>{
                
            });
          
          loadingComponent.close();
          })
      }
      else if(!this.isChangeImage1 &&  !this.isChangeImage2){
        
        axios({
              url:`${apiPath.api}/channels/${this.channel._id}/profile_setting`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
              data:{
          
              Bio:this.bio
              }
            }).then(res=>{
                
            });
           loadingComponent.close(); 
      }
      else{
        
      }

    

    },
    setMature(){
      axios({
              url:`${apiPath.api}/channels/changeMature/${this.channel._id}`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
            })
       
            .then(res=>{
              
            })
    },
    changeNotification(){
       axios({
              url:`${apiPath.api}/channels/changeNotification/${this.channel._id}`,
              headers:{'x-access-token':localStorage.getItem('token')},
              method:"PATCH",
            })
       
            .then(res=>{
              
            })
    }
  },
  computed:{
    getProfilePic(){
      return this.channel.Profile_Picture;
    },
    getBannerPic(){
      return this.channel.Profile_Banner;
    },
  
  }
}
</script>
<style scoped>
textarea {
    font-family: "GTEestiDisplayRegular2";
}
</style>
