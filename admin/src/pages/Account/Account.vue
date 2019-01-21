<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Account</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col xs="12">
        <div class="pb-xlg h-100">
          <Widget
            title="<h5> <span class='fw-semi-bold'>Admin</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
            close
            collapse
          >
            <div class="clearfix mb-3">
              <b-row>
                <b-col lg="6" sm="6" xs="12"></b-col>
                <b-col lg="6" sm="6" xs="12">
                  <div class="float-right mr-3 right">
                    <b-dropdown variant="info" size="lg" no-caret>
                      <template slot="button-content">
                        <i class="la la-cog px-2 la-lg mr-5 hoverIcon" id="ddown-header"/>
                      </template>
                      <b-dropdown-item>
                        <b-btn v-b-modal="'modal_email'" variant="link">Change Email</b-btn>
                      </b-dropdown-item>
                      <b-dropdown-item>
                        <b-btn v-b-modal="'modal_pass'" variant="link">Change Password</b-btn>
                      </b-dropdown-item>
                    </b-dropdown>
                    <i class="la la-angle-right px-2 la-lg ml-3 hoverIcon"/>
                    <b-modal
                      id="modal_email"
                      centered
                      @ok="handleOk"
                      ok-title="Confirm"
                      cancel-title="Dismiss"
                      cancel-variant="danger"
                      ok-variant="info"
                      :lazy="true"
                    >
                      <b-container>
                        <b-row>
                          <b-col lg="12" sm="12" xs="12">
                            <div class="form-group">
                              <label for="key">New Email</label>
                              <input
                                class="form-control no-border"
                                ref="bio"
                                required
                                type="email"
                                name="key"
                                placeholder="New Email"
                              >
                            </div>
                            <div class="form-group">
                              <label for="key">Password</label>
                              <input
                                class="form-control no-border"
                                ref="bio"
                                required
                                type="password"
                                name="key"
                                placeholder="Enter your password"
                              >
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-modal>
                    <b-modal
                      id="modal_pass"
                      centered
                      @ok="handleOk"
                      ok-title="Confirm"
                      cancel-title="Dismiss"
                      cancel-variant="danger"
                      ok-variant="info"
                      :lazy="true"
                    >
                      <b-container>
                        <b-row>
                          <b-col lg="12" sm="12" xs="12">
                            <div class="form-group">
                              <label for="key">Current Password</label>
                              <input
                                class="form-control no-border"
                                ref="bio"
                                required
                                type="password"
                                name="key"
                                v-model="newValidate.current_pass"
                                placeholder="Your current password"
                              >
                            </div>
                            <div class="form-group">
                              <label for="key">New Password</label>
                              <input
                                class="form-control no-border"
                                ref="bio"
                                v-model="newValidate.password"
                                required
                                type="password"
                                name="key"
                                placeholder="Enter your password"
                              >
                            </div>
                            <div class="form-group">
                              <label for="key">Re-Enter Password</label>
                              <input
                                class="form-control no-border"
                                ref="bio"
                                v-model="newValidate.re_password"
                                required
                                type="password"
                                name="key"
                                placeholder="Enter your password"
                              >
                            </div>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-modal>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="clearfix mb-3">
              <b-row>
                <b-col lg="6" md="12" sm="12" class="avatar_holder">
                  <b-container>
                    <v-lazy-image width="100%" class="img_in" :src="account.Profile_Picture || ''"/>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      class="inputfile"
                      style="display:none;"
                    >
                    <label for="file" class="changeAvatar">
                      <i class="px-5 la la-camera-retro la-lg text-info"></i>
                    </label>
                  </b-container>
                </b-col>
                <b-col lg="6" md="12" sm="12">
                  <b-container>
                    <div class="form-group mt-3">
                      <label for="key">Username</label>
                      <input
                        class="form-control no-border"
                        ref="bio"
                        :value="account.Username"
                        required
                        type="text"
                        name="key"
                        disabled
                        placeholder="Email"
                      >
                    </div>
                    <div class="form-group">
                      <label for="key">Email</label>
                      <input
                        class="form-control no-border"
                        ref="bio"
                        :value="account.Email"
                        required
                        type="text"
                        name="key"
                        placeholder="Email"
                      >
                    </div>
                    <div class="form-group">
                      <label for="key">Ages</label>
                      <div class="form-control no-border">{{count(account.DateofBirth)}}</div>
                    </div>
                    <div class="form-group">
                      <label for="key">Born</label>
                      <div class="form-control no-border">{{parseDate(account.DateofBirth)}}</div>
                    </div>
                  </b-container>
                </b-col>
              </b-row>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import axios from "axios";
import Widget from "@/components/Widget/Widget";
import VLazyImage from "v-lazy-image";
import moment from "moment";
export default {
  name: "AccountPage",
  components: {
    Widget,
    VLazyImage
  },
  data() {
    return {
      account: [],
      newEmail: "",
      newValidate: {
        password: "",
        re_password: "",
        current_pass: ""
      }
    };
  },
  methods: {
    handleOk(evt) {
      evt.preventDefault();

      if (evt.target.id == "modal_pass") {
        if (
          this.newValidate.password !== "" &&
          this.newValidate.re_password !== "" &&
          this.newValidate.re_password == this.newValidate.password
        ) {
          axios({
            method: "POST",
            headers: {
              "x-access-token": window.localStorage.getItem("token_admin")
            },
            data: {
              x: this.newValidate.current_pass,
              n: this.newValidate.password,
              id: window.localStorage.getItem("userId")
            },
            url: "http://localhost:3000/admin/se"
          })
            .then(({ data }) => {
              if (data.success) {
                this.$store.commit("layout/setUser", '');
                window.localStorage.setItem("userId", '');
                window.localStorage.setItem("mail",'');
                window.localStorage.setItem("authenticated", false);
                window.localStorage.setItem("token_admin",'');
                this.$store.commit("layout/setAuth", false);
                this.$store.commit("layout/setEmail",'');
                this.$router.push("/app");
              }
            })
            .catch(() => {});
        }
      } else {
      }
    },
    count(date) {
      return moment(date)
        .fromNow()
        .replace("years ago", "");
    },
    parseDate(date) {
      return moment(date).format("MMMM Do YYYY");
    }
  },

  beforeCreate() {
    axios({
      method: "GET",
      headers: {
        "x-access-token": window.localStorage.getItem("token_admin")
      },
      url: `http://localhost:3000/admin/account/${window.localStorage.getItem(
        "userId"
      )}`
    }).then(({ data }) => {
      this.account = data.account;
    });
  }
};
</script>
<style src="./Account.scss" lang="scss" />


