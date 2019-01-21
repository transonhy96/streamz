<template>
  <div class="hero">
    <b-notification ref="element" :closable="false">
      <div class="columns">
        <div class="column is-7">
          <div class="columns">
            <div id="video_box">
              <div id="video_overlays" :class="{'overlay':isOffline}">
                <div class="over">
                  <div class="views">
                    <i class="fas fa-dot-circle" style="color:red"></i> ONLINE
                  </div>
                </div>
              </div>
              <div>
                <video
                  id="player"
                  width="900px"
                  height="500px"
                  controls
                  ref="video"
                >Your browser does not support this streaming content.</video>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-8">
              <div class="columns">
                <div class="col">
                  <button
                    v-if="allowFollow"
                    class="button is-primary"
                    :class="{'is-loading':isloadingFollow}"
                    @click="follow"
                  >
                    <i class="fab fa-gratipay"></i>
                    &nbsp&nbsp{{getfollowText}}
                  </button>
                </div>
                <div class="col"></div>
              </div>
            </div>
            <div class="column is-4">
              <div class="columns is-3">
                <div class="column">
                  <div class="has-text-centered"></div>
                </div>&nbsp
                &nbsp
                <div class="column">
                  <i class="fas fa-eye"></i>
                  &nbsp&nbsp{{getViews}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-5">
          <p class="has-text-left">Stream chat</p>
          <div class="columns chat-holder is-primary">
            <div class="column">
              <div class="container box">
                <div class="chat">
                  <div class="messages" v-for="msg in messages">
                    <p class>
                      <span class="font-weight-bold">{{ msg.user }}:</span>
                      {{ msg.message }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <br>
            <div class="column">
              <form @submit.prevent="sendMessage">
                <input
                  v-model="message"
                  class="textarea has-icons-right"
                  rows="3"
                  type="text"
                  placeholder="Type your message here"
                >
              </form>
            </div>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isComponentModalActive" has-modal-card style="z-index:1;">
        <modal v-on:closeModal="isComponentModalActive = false"></modal>
      </b-modal>
    </b-notification>
  </div>
</template>

<script>
import io from "socket.io-client";
import flvjs from "flv.js";
import { apiPath } from "../config";
import request from "../_helper/request";
import Modal from "@/components/Modal.vue";
export default {
  name: "Stream",
  components: { Modal },
  props: ["streamKey"],

  data() {
    return {
      message: "",
      messages: [],
      socket: io("localhost:3000"),
      user: "",
      views: 0,
      allowFollow:true,
      isOffline: false,
      room: "",
      isFullfill: false,
      channel: {},
      hosted: {},
      url: "",
      isloadingFollow: false,
      followText: "Follow",
      isFollowed: false,
      isComponentModalActive: false
    };
  },
  computed: {
    getViews() {
      return this.views;
    },
    getfollowText() {
      let data = this.hosted.Followers;
      if (data) {
        data.forEach(element => {
          if (element.userId == this.$store.getters.userId) {
            this.followText = "Followed";
            this.isFollowed = true;
          }
        });
      }
      return this.followText;
    }
  },

  beforeRouteLeave(to, from, next) {
    this.socket.emit("LEAVEROOM", { room: this.room });
    next();
  },
  methods: {
    sendMessage(e) {
      if (this.message) {
        this.socket.emit("SEND_MESSAGE", {
          user: this.$store.getters.users.username || "anonimous",
          message: this.message,
          room: this.room
        });
        this.message = "";
      }
    },
    follow() {
      this.isloadingFollow = true;
      let userId = this.$store.getters.userId;
      let user = this.$store.getters.users.username;
      if (userId) {
        if (user != "") {
          if (this.isFollowed) {
            
            this.$snackbar.open({
              message: "Are you sure want to unfollow",
              type: "is-warning",
              position: "is-top",
              actionText: "Yes",
              indefinite: true,
              onAction: () => {
                this.isloadingFollow = false;
                this.followText = "Follow";
                request("PATCH", `/channels/unfollow/${this.hosted._id}`, {user: {
                        username: user,
                        userId: userId,
                        unfollowAt: Date.now()
                }
                      })
                      .then(res=>{
                        this.isFollowed = false;
                        
                            request("PATCH", `/channels/removefollowing/${userId}`, {
                                  user: {
                                    username: this.hosted.Username,
                                    userId: this.hosted._id,
                                    unfollowAt: Date.now()
                                  }
                
            }).then((res)=>{

            });
            });
                }
              });

          } else {
            request("PATCH", `/channels/addfollow/${this.hosted._id}`, {
              user: {
                username: user,
                userId: userId,
                followeAt: Date.now()
              }
            })
              .then(res => {
                this.isloadingFollow = false;
                this.followText = "Unfollow";
                this.isFollowed = true;
                request("PATCH", `/channels/addfollowing/${userId}`, {
                  user: {
                    username: this.hosted.Username,
                    userId: this.hosted._id,
                    followeAt: Date.now()
                  }
                }).then(res => {
                  console.log(res);
                });
              })
              .catch(err => {
                this.isloadingFollow = false;
              });
          }
        } else {
          this.$snackbar.open({
            message: "You are not currently logging in",
            type: "is-info",
            position: "is-bottom",
            actionText: "Ok",
            indefinite: true,
            onAction: () => {
              this.isloadingFollow = false;
              this.isComponentModalActive = true;
            }
          });
        }
      } else {
        this.$snackbar.open({
          message: "You are not currently logging in",
          type: "is-info",
          position: "is-bottom",
          actionText: "Ok",
          indefinite: true,
          onAction: () => {
            this.isloadingFollow = false;
            this.isComponentModalActive = true;
          }
        });
      }
    }
  },
  created() {
    this.room = this.$route.params["name"];

    if (this.$store.getters.users.username) {
      this.user = this.$store.getters.users.username;
    } else {
      this.user = "anonimous";
    }
    if(this.room == this.user){
      this.allowFollow = false;
    }
    this.messages.push({ user: "Admin", message: `Welcome to ${this.room} stream` });
  },
  beforeDestroy() {
    this.socket.emit("LEAVEROOM", { room: this.room });
  },
  mounted() {
    request("GET", `/channels/username/${this.$route.params["name"]}`)
      .then(({ data }) => {
        if (data) {
          this.hosted = data;
        }
        request("PATCH",`/channels/increaseView/${this.$route.params["name"]}`).then(req=>{
          console.log(res);
        });
        let video = this.$refs["video"];
        if (flvjs.isSupported()) {
          var videoElement = (video = this.$refs["video"]);
          var flvPlayer = flvjs.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${data.StreamKey}.flv`
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      })
      .catch(err => {});

    this.socket.emit("ROOM", { room: this.room });

    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
    });
    this.socket.emit("GET_VIEWS", {
      room: this.room
    });
    this.socket.on("VIEWS", data => {
      this.views = data;
    });

    window.addEventListener("beforeunload", () => {
      this.socket.emit("LEAVEROOM", { room: this.room });
    });
  }
};
</script>
<style scoped>
.chat-holder {
  min-height: 300px;
}
.chat {
  height: 280px;
  max-height: 280px;
  overflow: auto;
}
#video_box {
  float: left;
}
#video_overlays {
  position: absolute;
  float: left;
  width: 900px;
  min-height: 450px;
}
.overlay {
  background: rgba(0, 0, 0, 1);
}
.over {
  position: relative;
}
.views {
  position: absolute;
  left: 10px;
  top: 10px;
  color: white;
}
</style>
