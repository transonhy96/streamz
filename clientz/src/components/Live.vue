<template>
  <div class="columns">
    <div class="column is-4">
      <section>
        <p>Stream Information</p>
        <div class="box">
          <b-field label="Title">
            <b-input
              v-model="channel.Live_Title"
              placeholder="Stream title"
              maxlength="136"
              required="required"
            ></b-input>
          </b-field>

          <b-field label="Go Live Notification">
            <textarea
              class="textarea"
              v-model="channel.Go_Live_Notification"
              placeholder="Live Notification"
              maxlength="130"
              rows="2"
            ></textarea>
          </b-field>
          <b-field label="Category">
            <b-autocomplete
              v-model="game"
              :data="data"
              placeholder="Search for category"
              field="FullName"
              :value="data._id"
              :loading="isFetching"
              @keyup.native="getAsyncData"
              @select="option => selected = option"
            >
              <template slot-scope="props">
                <div class="media">
                  <div class="media-left">
                    <img width="32" :src="props.option.Image_Cover">
                  </div>
                  <div class="media-content">{{ props.option.FullName }}</div>
                </div>
              </template>
            </b-autocomplete>
          </b-field>

          <b-field label="Language">
            <b-select
              placeholder="English"
              v-model="selectedLanguage"
              style="font-family: 'GTEestiDisplayRegular2;'"
              icon="globe-asia"
              icon-pack="fas"
            >
              <option
                v-for="language of languages"
                style="font-family: 'GTEestiDisplayRegular2;'"
                :key="language._id"
                :value="language.Name"
              >{{language.Name}}</option>
            </b-select>
          </b-field>
          <b-field>
            <div class="block">
              <br>
              <button
                class="button is-primary"
                :class="{'is-loading':isUpdate}"
                @click="update"
              >Update Information</button>
            </div>
          </b-field>
        </div>
      </section>
    </div>
    <div class="column is-5">
      <section>
        <p>Video Preview</p>

        <div class="box">
          <p class="is-pulled-right">Offline</p>
          <video width="430px" height="200px" ref="videoPreview" controls></video>
        </div>
      </section>
      <section>
        <p>Stream Status</p>
        <div class="box">
          <div class="block">Watchings</div>
          <div class="block">Online</div>
          <div class="block">Views</div>
          <div class="block">Follower</div>
          <div class="block">Clips</div>
        </div>
      </section>
    </div>
    <div class="column is-3">
      <section>
        <p>Chat</p>
        <div class="box">
          <b-field>
            <b-input placeholder="Send a message"></b-input>
            <button class="button is-primary">Send</button>
          </b-field>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { apiPath } from "../config";
import debounce from "lodash/debounce";
export default {
  name: "live",
  data() {
    return {
      channel: {},
      game: "",
      data: [],
      name: "",
      selected: null,
      isFetching: false,
      isUpdate: false,
      languages: [],
      selectedLanguage: "",
      updateChannel: {}
    };
  },
  methods: {
    getSelected(id) {},
    getAsyncData: debounce(function() {
      if (!this.game.length) {
        this.data = [];
        return;
      }
      this.isFetching = true;
      axios
        .get(`${apiPath.api}/games/islike/${this.game}`)
        .then(({ data }) => {
          this.data = [];
          data.game.forEach(item => this.data.push(item));
        })
        .catch(error => {
          this.data = [];
          throw error;
        })
        .finally(() => {
          this.isFetching = false;
        });
    }, 500),
    update() {
      this.isUpdate = true;
      axios
        .post(`${apiPath.api}/games/name`,{
          name:this.game
        })
        .then(({ data }) => {
          axios({
            method: "PATCH",
            headers: { "x-access-token": this.$store.getters.token },
            data: {
              Live_Title: this.channel.Live_Title,
              Go_Live_Notification: this.channel.Go_Live_Notification,
              Current_Streaming_Game: data._id,
              Language: this.selectedLanguage
            },
            url: `${apiPath.api}/channels/${this.channel._id}/dashboard/setting`
          }).then(res => {
            this.isUpdate = false;
            this.$toast.open({
              message: "Update successfully!",
              type: "is-success",
              position: "is-bottom"
            });
          });
        })
        .catch(err => {});
    }
  },
  beforeCreate() {
    let username = this.$store.getters.users.username;
    axios({
      method: "GET",
      headers: { "x-access-token": this.$store.getters.token },
      url: `${apiPath.api}/channels/username/${username}`
    })
      .then(res => {
        
        this.channel = res.data;

        this.selectedLanguage = res.data.Language;
        if(res.data.Current_Streaming_Game){
           axios
          .get(`${apiPath.api}/games/game_id/${res.data.Current_Streaming_Game}`)
          .then(res => {
            this.game = res.data.FullName;
          })
          .catch(err => {});
        }
        else{
          this.game = 'Please select a game to start stream';
        }
       
      })
      .catch(err => {});

    //

    axios
      .get(`${apiPath.api}/languages`)
      .then(({ data }) => {
        this.languages = data.lang;
      })
      .catch(err => {});
  }
};
</script>
<style scoped>
textarea {
  font-family: "GTEestiDisplayRegular2";
}
</style>
