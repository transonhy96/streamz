<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item @click="back">Games</b-breadcrumb-item>
      <b-breadcrumb-item active>{{currentGame.FullName || 'Create'}}</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col lg="4" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget collapse class="h-100 mb-0" title="Preview Image">
            <b-row>
              <b-col lg="12" sm="12" xs="12">
                <div class="container avatar_holder">
                  <v-lazy-image class="img_in" width="100%" :src="currentGame.Image_Cover" alt/>
                  <input
                    @change="handleUpload"
                    type="file"
                    name="game_img"
                    id="game_img"
                    class="inputfile"
                    style="display:none;"
                  >
                  <label for="game_img" class="changeAvatar">
                    <i class="px-5 la la-camera-retro la-lg text-info"></i>
                  </label>
                </div>
              </b-col>
            </b-row>
          </Widget>
        </div>
      </b-col>
      <b-col lg="8" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" collapse>
            <form @submit.prevent="handleAction">
              <b-row>
                <b-col>
                  <div class="ml-3 mr-3">
                    <h2>
                      {{currentGame.Views}}
                      <small>(times)</small>
                    </h2>

                    <div class="form-group mt-5">
                      <label for="short">Short name</label>
                      <input
                        class="form-control no-border"
                        ref="shortname"
                        v-model="currentGame.ShortName"
                        required
                        type="text"
                        name="short"
                        placeholder="Short name"
                        @keyup="changeState"
                      >
                    </div>
                    <div class="form-group">
                      <label for="full">Full name</label>
                      <input
                        class="form-control no-border mb-5"
                        ref="fullname"
                        v-model=" currentGame.FullName"
                        required
                        type="text"
                        name="full"
                        placeholder="Full name"
                        @keyup="changeState"
                      >
                    </div>

                    <div class="container">
                      <b-row>
                        <b-col lg="1" md="6" xs="12">
                          <span class="mr-3">Genre:</span>
                        </b-col>
                        <b-col lg="11" md="6" xs="12">
                          <div class="inline-type mb-2 ml-2 mt-1" v-for="type in  currentGame.Type">
                            <b-button variant="info" class="mr-2">
                              {{type.Name}} &nbsp
                              <i
                                class="la la-plus text-default rotate-315 hoverIcon"
                                @click="removeType(type)"
                              />
                            </b-button>
                          </div>
                          <b-btn
                            variant="danger"
                            v-if="getShowRemoveAll"
                            class="mr-2 ml-2 text-default"
                            @click="removeAll"
                          >Remove all</b-btn>
                          <b-btn variant="default" @click="addMoreType" v-if="!isAdd">
                            <i
                              class="la la-plus text-info la-lg hoverIcon"
                              :class="{'rotate-315 text-default':showOption}"
                            />
                          </b-btn>
                        </b-col>
                      </b-row>
                    </div>

                    <b-form-select
                      v-if="isAdd || showOption"
                      :options="getOptions"
                      class="mb-3 mt-3"
                      :select-size="6"
                      v-on:change="getSelectedItem"
                    ></b-form-select>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-container>
                    <div class="float-left mt-5">
                      <b-button size="lg" variant="info" type="submit" :disabled="!getChangeState">
                        <span v-if="isAdd">Add</span>
                        <span v-if="!isAdd">Update</span>
                      </b-button>
                    </div>
                  </b-container>
                </b-col>
              </b-row>
            </form>
          </Widget>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Widget from "../Widget/Widget";
import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
import store from "../../store";
import VLazyImage from "v-lazy-image";
import uploadImg from "../../helper/uploadImage/upload";
export default {
  name: "EditComponent",
  components: {
    Widget,
    VLazyImage
  },
  data() {
    return {
      isAdd: false,
      isChange: false,
      selected: null,
      firstLoadState: {
        TypeArrLength: 0,
        ShortName: "",
        FullName: "",
        Image_Cover: ""
      },
      variant: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ],
      types: [],
      options: [],
      showOption: false,
      showRemove: false,
      currentGame: {
        _id: "",
        ShortName: "",
        FullName: "",
        Image_Cover: "https://i.imgur.com/UpzTuRK.png",
        Views: 0,
        Type: [],
        CreatedAt: Date.now(),
        UpdatedAt: Date.now()
      },
      tempGame: {
        _id: "",
        ShortName: "",
        FullName: "",
        Image_Cover: "https://i.imgur.com/UpzTuRK.png",
        Views: 0,
        Type: [],
        CreatedAt: Date.now(),
        UpdatedAt: Date.now()
      }
    };
  },
  computed: {
    ...mapGetters("layout", ["getPointedGame"]),
    getOptions() {
      return (this.options = this.types.map(oldval => {
        let obj = { value: oldval._id, text: oldval.Name };
        return obj;
      }));
    },
    getShowRemoveAll() {
      if (this.currentGame.Type.length > 3) {
        return true;
      } else {
        return false;
      }
    },
    getChangeState() {
      return this.isChange;
    }
  },
  beforeRouteLeave(next){
      console.log(this.currentGame);
      next();
  },

  created() {
    if (this.$store.getters["layout/getAction"] == "update") {
      this.currentGame = this.$store.getters["layout/getPointedGame"];
      this.firstLoadState.TypeArrLength = this.currentGame.Type.length;
      this.firstLoadState.ShortName = this.currentGame.ShortName;
      this.firstLoadState.FullName = this.currentGame.FullName;
      this.isAdd = false;
    } else {
      this.isAdd = true;
    }
    axios
      .get("http://localhost:3000/api/game_types", {
        headers: { "x-access-token": localStorage.getItem("token_admin") }
      })
      .then(({ data }) => {
        this.types = data.game_type;
      });
  },
  methods: {
    getRandom() {
      return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    },
    changeState() {
      this.isChange = true;
    },
    handleAction() {
      if (this.currentGame._id !== "") {
        //update
        axios({
          method: "PATCH",
          headers: {
            "x-access-token": window.localStorage.getItem("token_admin")
          },
          data: this.currentGame,
          url: "http://localhost:3000/admin/games/" + this.currentGame._id
        })
          .then(({ data }) => {
            if (data.success) {
              this.$store.commit("layout/setPointedGame", {});
              this.$router.back();
            }
          })
          .catch(() => {
            this.currentGame = this.$store.getters["layout/getPointedGame"];
          });
      } else {
        //add new

        axios({
          method: "POST",
          headers: {
            "x-access-token": window.localStorage.getItem("token_admin")
          },
          data: this.currentGame,
          url: "http://localhost:3000/admin/games/"
        })
          .then(res => {
            this.currentGame = this.tempGame;
            this.$router.back();
          })
          .catch(() => {
            this.currentGame = this.tempGame;
          });
      }
    },
    getSelectedItem(val) {
      this.isChange = true;
      let arrs = this.types.find(op => {
        if (op._id == val) return op.Name;
        return false;
      });

      let arr = { _id: arrs._id, Name: arrs.Name };

      if (this.currentGame.Type.length > 0) {
        let notExist = true;
        this.currentGame.Type.find(op => {
          if (op.Name == arr.Name) {
            notExist = false;
          }
        });
        if (notExist) {
          this.currentGame.Type.push(arr);
        }
      } else {
        this.currentGame.Type.push(arr);
      }
    },
    handleUpload(e) {
      if (e.target.files[0]) {
        this.isChange = true;

        uploadImg(e.target.files[0]).then(({ data }) => {
          this.currentGame.Image_Cover = data.data.link;
        });
      }
    },
    removeAll() {
      this.currentGame.Type = [];
    },
    addMoreType() {
      this.showOption = !this.showOption;
      this.isChange = true;
    },
    removeType(t) {
      if (this.currentGame) {
        this.currentGame.Type.forEach((e, i) => {
          if (e.Name == t.Name) {
            this.currentGame.Type.splice(i, 1);
          }
        });
      } else {
      }
      this.isChange = true;
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
        .replace("ago", "");
    }
  }
};
</script>
<style src="./Edit.scss" lang="scss" />
