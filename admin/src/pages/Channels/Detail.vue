<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item @click="back">Channels</b-breadcrumb-item>
      <b-breadcrumb-item active>{{getPointedChannel.Username}}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col lg="8" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget collapse class="h-100 mb-0" title="Avatar">
            <b-row>
              <b-col lg="2" sm="4" xs="12">
                <img width="100" height="100" :src="getPointedChannel.Profile_Picture" alt>
              </b-col>
              <b-col lg="5" sm="6" xs="12">
                <div class="form-group">
                  <label for="cemail">Email</label>
                  <div
                    class="form-control no-border"
                    id="cemail"
                  >{{getPointedChannel.Email || "johndoe@gmail.com"}}</div>
                </div>
                <div class="form-group">
                  <b-button variant="info" v-b-modal="'modal_contact'" :disabled="getOnContact">
                    <span v-if="!getOnContact">Contact</span>
                    <Stretch v-if="getOnContact"></Stretch>
                  </b-button>

                  <b-modal
                    id="modal_contact"
                    centered
                    size="lg"
                    @ok="handleContact"
                    ok-title="Send"
                    cancel-title="Dismiss"
                    cancel-variant="danger"
                    ok-variant="info"
                    :lazy="true"
                    ref="modal_contact"
                  >
                    <b-container>
                      <b-row>
                        <b-col lg="12" sm="12" xs="12">
                          <div class="form-group">
                            <label for="key">Subject</label>
                            <input
                              class="form-control no-border"
                              v-model="subject"
                              required
                              value="From admin of streamz"
                              type="text"
                              name="key"
                            >
                          </div>
                          <div class="form-group">
                            <label for="key">Content</label>
                            <textarea
                              class="form-control no-border"
                              v-model="content"
                              required
                              type="text"
                              name="key"
                              rows="5"
                              placeholder="Content"
                            ></textarea>
                          </div>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-modal>
                </div>
              </b-col>
              <b-col lg="5" sm="6" xs="12">
                <div class="float-right mt-5">
                  <div class="form-group">
                    <b-button
                      variant="danger"
                      v-b-modal="'modal_terminate'"
                      :disabled="onTerminate"
                    >
                      <span v-if="!onTerminate">Terminate</span>

                      <Stretch v-if="onTerminate"></Stretch>
                    </b-button>

                    <b-modal
                      id="modal_terminate"
                      centered
                      @ok="handleTerminate"
                      ok-title="Proceed"
                      cancel-title="Dismiss"
                      cancel-variant="default"
                      ok-variant="danger"
                      :lazy="true"
                      ref="modal_terminate"
                      @shown="counter"
                    >
                      <template slot="modal-header">
                        <b-container>
                          <p
                            v-if="showInfo"
                            class="text-info"
                          >This window will automatically close in {{getCountdown}}</p>
                        </b-container>
                      </template>

                      <b-container>
                        <b-row>
                          <b-col lg="12" sm="12" xs="12">
                            <div class="form-group">
                              <label for="key">Enter your password</label>
                              <input
                                class="form-control no-border"
                                required
                                type="password"
                                v-model="authpass"
                                name="key"
                                placeholder="Enter your password"
                                @focus="modalClick"
                              >
                            </div>
                            <div class="form-group">
                              <label for="key">Reason</label>
                              <textarea
                                class="form-control no-border"
                                required
                                type="text"
                                name="key"
                                rows="5"
                                v-model="reason"
                                placeholder="Why do you terminate this channel"
                                @focus="modalClick"
                              ></textarea>
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-modal>
                  </div>
                </div>
              </b-col>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Total Views" collapse>
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>{{getPointedChannel.Views}}</h2>
              <i class="la la-arrow-right text-success rotate-315"/>
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>{{getPointedChannel.Followers.length}}</h6>
                <p class="text-muted mb-0 mr">
                  <small>Followers</small>
                </p>
              </div>
              <div class="mt">
                <h6>{{getPointedChannel.Followings.length}}</h6>
                <p class="text-muted mb-0">
                  <small>Followings</small>
                </p>
              </div>
              <div class="mt">
                <h6>{{getPointedChannel.Friends.length}}</h6>
                <p class="text-muted mb-0 mr">
                  <small>Friends</small>
                </p>
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col lg="6" sm="6" xs="12">
            <Widget
              title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            <span class='fw-normal ml-xs'>Bio :</span>
          </h4>"
              bodyClass="p-0 mt"
              customHeader
              collapse
            >
              <div class="container">
                <form action>
                  <div class="form-group">
                    <textarea
                      class="form-control no-border"
                      ref="bio"
                      :value="getPointedChannel.Bio"
                      required
                      type="text"
                      name="bio"
                      rows="5"
                      disabled
                      placeholder="Owner's personality"
                    ></textarea>
                  </div>
                </form>
              </div>

              <div class="d-flex border-top">
                <div class="w-50 border-right p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6>
                      Live Title :
                      <strong>{{getPointedChannel.Live_Title}}</strong>
                    </h6>
                  </div>
                </div>
                <div class="w-50 p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6>
                      Live Notification :
                      <strong>{{getPointedChannel.Go_Live_Notification}}</strong>
                    </h6>
                  </div>
                </div>
              </div>
              <div class="d-flex border-top">
                <div class="w-50 border-right p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6>
                      Language :
                      <strong>{{getPointedChannel.Language}}</strong>
                    </h6>
                  </div>
                </div>
                <div class="w-50 p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6>
                      Born :
                      <strong>{{parseDate(getPointedChannel.DateofBirth)}}</strong>
                    </h6>
                  </div>
                  <p>
                    Age :
                    <strong>&nbsp{{age(getPointedChannel.DateofBirth)}}</strong>
                  </p>
                </div>
              </div>
            </Widget>
          </b-col>
          <b-col lg="6" sm="6" xs="12">
            <Widget
              title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            <span class='fw-normal ml-xs'>Settings :</span>
          </h4>"
              bodyClass="p-0 mt"
              customHeader
              collapse
            >
              <div class="container">
                <div class="form-group">
                  <label for="key">Stream Key</label>
                  <input
                    class="form-control no-border"
                    ref="bio"
                    :value="getPointedChannel.StreamKey"
                    required
                    type="text"
                    name="key"
                    disabled
                    placeholder="Stream key"
                  >
                </div>
                <div class="form-group">
                  <label for="path">Stream Path</label>
                  <input
                    class="form-control no-border"
                    ref="path"
                    :value="getPointedChannel.BroadCast_Path"
                    required
                    type="text"
                    name="path"
                    disabled
                    placeholder="Stream key"
                  >
                </div>
              </div>

              <div class="d-flex border-top">
                <div class="w-50 border-right p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="form-group">
                      <label for="title">Title</label>
                      <input
                        class="form-control no-border"
                        ref="title"
                        :value="getPointedChannel.Title"
                        disabled
                        required
                        type="text"
                        name="title"
                        placeholder="Title"
                      >
                    </div>
                  </div>
                </div>
                <div class="w-50 p-3 px-4">
                  <div class="d-flex justify-content-between align-items-center">
                    <h6>
                      Live Notification :
                      <strong>{{getPointedChannel.Go_Live_Notification}}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </Widget>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6" sm="8" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Profile Banner" close collapse>
            <v-lazy-image width="100%" height="100%" :src="getPointedChannel.Profile_Banner" alt/>
          </Widget>
        </div>
      </b-col>
      <b-col lg="6" sm="8" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Stream Overlay" close collapse>
            <v-lazy-image
              width="100%"
              height="100%"
              :src="getPointedChannel.VideoPlayer_Banner"
              alt
            />
          </Widget>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
import { mapState, mapActions, mapGetters } from "vuex";
import VLazyImage from "v-lazy-image";
import moment from "moment";
import axios from "axios";
import { Stretch } from "vue-loading-spinner";
import store from "../../store";
export default {
  name: "DetailPage",
  components: {
    Widget,
    VLazyImage,
    Stretch
  },
  data() {
    return {
      subject: "From Admin of streamz",
      content: "",
      i: 6,
      timeout: null,
      terminate: false,
      showInfo: true,
      reason: "",
      authpass: "",
      onContact: false,
      onTerminate: false
    };
  },
  watch: {
    i(val) {
      if (val == 0) {
        clearTimeout(this.timeout);
        this.terminate = false;
        this.$refs.modal_terminate.hide();
      }
    }
  },
  computed: {
    ...mapGetters("layout", ["getPointedChannel"]),
    getCountdown() {
      if (this.terminate) {
        this.timeout = setTimeout(() => {
          if (this.i > 0) {
            this.i--;
          }
        }, 1000);
        return this.i;
      }
    },
    getOnContact() {
      return this.onContact;
    }
  },
  beforeCreate() {
    this.pointedChannel = this.$store.state.pointedChannel;
  },
  beforeRouteLeave (to, from, next) {
    console.log(to);
    if(to.name =="ChannelsPage"){
      store.commit("layout/setPointedChannel", []);
      next();
    }
    next();
  },
  methods: {
    counter() {
      this.i = 6;
      this.showInfo = true;
      this.terminate = true;
      this.content = "";
      this.authpass = "";
    },
    modalClick() {
      this.showInfo = false;
      clearTimeout(this.timeout);
    },
    handleTerminate(e) {
      e.preventDefault();
      this.onTerminate = true;
      this.$refs.modal_terminate.hide();
      axios({
        method: "DELETE",
        url:
          "http://localhost:3000/admin/channels/" +
          this.$store.getters["layout/getPointedChannel"]._id,
        headers: {
          "x-access-token": window.localStorage.getItem("token_admin")
        },
        data: {
          Password: this.authpass
        }
      }).then(({ data }) => {
        if (data.success) {
          axios({
            method: "POST",
            url: "http://localhost:3000/api/mailer/send",
            headers: {
              "x-access-token": window.localStorage.getItem("token_admin")
            },
            data: {
              reciever: this.$store.getters["layout/getPointedChannel"].Email,
              sender: window.localStorage.getItem("email"),
              subject: "Account Center",
              contents: `Dear ${
                this.$store.getters["layout/getPointedChannel"].Username
              },
            We are sorry to announce that your account has been terminated because of these following reasons : ${
              this.reason
            }`
            }
          })
            .then(({ data }) => {
              this.$router.back();
              this.onTerminate = false;
              if (data.sent == true) {
              }
            })
            .catch(() => {
              this.onTerminate = false;
            });
        } else {
          console.log("Not deleted");
        }
      });
    },
    handleContact(e) {
      this.$refs.modal_contact.hide();
      e.preventDefault();

      this.onContact = true;

      axios({
        method: "POST",
        url: "http://localhost:3000/api/mailer/send",
        headers: {
          "x-access-token": window.localStorage.getItem("token_admin")
        },
        data: {
          reciever: this.$store.getters["layout/getPointedChannel"].Email,
          sender: window.localStorage.getItem("email"),
          subject: this.subject,
          contents: this.content
        }
      })
        .then(({ data }) => {
          if (data.sent == true) {
            this.onContact = false;
          }
        })
        .catch(() => {
          this.onContact = false;
        });
    },
    back() {
      this.$router.back();
    },
    parseDate(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    age(date) {
      return moment(date)
        .fromNow()
        .replace("years ago", "");
    },
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ["SMX", "Direct", "Networks"];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1
        });
      }

      return data;
    }
  }
};
</script>
<style src="./Detail.scss" lang="scss" />
