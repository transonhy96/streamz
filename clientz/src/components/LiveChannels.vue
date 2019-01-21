<template>
  <div class="channel">
    <div class="channel-custom" v-for="channel of channels">
      <div class="columns">
        <div class="column">
          <a  @click="gotoStream(channel.Username)">
            <v-lazy-image
              :src="channel.VideoPlayer_Banner"
              class="video_banner"
            />
          </a>
          <div class="columns">
            <div class="column is-one-fifth">
              <img :src="channel.Profile_Picture" class="avatar" alt>
            </div>
            <div class="column">
              <small>{{channel.Live_Title || "Live title not set"}}</small>
              <br>
              <button
                class="button is-small"
                @click="gotoStream(channel.Username)"
              >{{channel.Username}}</button>
              &nbsp
              <small>{{channel.Language ||"Language not set"}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../_helper/request";
import VLazyImage from "v-lazy-image";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "livechannel",
  components: {
    VLazyImage,
    ContentLoader
  },
  data() {
    return {
      channels: [],
      page: 1
    };
  },
  methods: {
    gotoStream(displayName) {
      this.$router.push({ path: "/channel/stream/" + displayName });
    }
  },

  beforeCreate() {
    request("GET", `/channels/pages/1`, {}).then(({ data }) => {
      this.channels = data.channel;
    });
  }
};
</script>

<style scoped>
.channel {
  display: inline-flex;
  flex-wrap: wrap;
}
small {
  font-weight: lighter;
}
.column {
  padding: 15px;
}
.channel-custom {
  margin-right: 20px;
  max-width: 300px;
}
.video_banner {
  border-radius: 3px;
  min-height: 187px;
}
.avatar {
  min-width: 50px;
  min-height: 35px;
}
.v-lazy-image {

  filter: blur(5px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
}
button {
  border-style: dashed;
}
</style>

