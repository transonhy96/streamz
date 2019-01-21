<template>
  <div class="modal-card" style="width:400px;height:auto">
    <b-tabs v-model="activeTab" position="is-right">
      <b-tab-item label="Sign in">
        <header class="modal-card-head"></header>
        <section class="modal-card-body">
          <b-field label="Username" :type="{'is-danger':errNoDispose}">
            <b-input
              type="text"
              @focus="removeErr"
              v-model="user.username"
              placeholder="Your username"
              required
            ></b-input>
          </b-field>
          <b-field label="Password" :type="{'is-danger':errNoDispose}">
            <b-input
              type="password"
              v-model="user.password"
              @focus="removeErr"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot" style="border:none;">
          <div class="columns">
            <div class="column">
              <button
                class="button is-info"
                :class="{'is-loading':isActive}"
                :disabled="!checkValid"
                style="font-family: 'GTEestiDisplayRegular2'; min-width:100px"
                @click="signin"
              >Sign in</button>
            </div>
          </div>
        </footer>
      </b-tab-item>

      <b-tab-item label="Sign up">
        <template slot="header">
          <b-icon icon="information-outline"></b-icon>
          <span>Sign up</span>
        </template>
        <header class="modal-card-head"></header>
        <section class="modal-card-body">
          <b-field label="Username" :type="{'is-danger':errNoDispose}">
            <input
              type="text"
              class="input"
              v-on:change="checkUserExist"
              v-model="newUser.username"
              placeholder="Your username"
              required
            >
          </b-field>
          <b-field label="Password" :type="{'is-danger':errNoDispose}">
            <b-input
              type="password"
              v-model="newUser.password"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>
          <b-field label="Date of Birth">
            <b-datepicker placeholder="MM/dd/YYYY" v-model="newUser.dateofbirth " editable></b-datepicker>
          </b-field>
          <b-field label="Email" :type="{'is-danger':errNoDispose}">
            <b-input
              type="email"
              style="font-family: 'GTEestiDisplayRegular2'!important;"
              v-model="newUser.email"
              placeholder="Your email"
              required
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot" style="border:none;">
          <div class="columns">
            <div class="column">
              <button
                class="button is-success"
                type="submit"
                :class="{'is-loading':issignupActive}"
                :disabled="!checkSignUpValid"
                style="font-family: 'GTEestiDisplayRegular2'; min-width:100px"
                @click="signup"
              >Sign up now</button>
            </div>
          </div>
        </footer>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import login from "../_helper/authorize";
import { validateEmail } from "../_helper/validate";
import signup from "../_helper/signup";
import moment from "moment";
export default {
  name: "Modal",
  props: ["username", "password"],
  data() {
    return {
      activeTab: 0,
      isActive: false,
      issignupActive: false,
      errNoDispose: false,
      user: {
        username: "",
        password: ""
      },
      newUser: {
        username: "",
        password: "",
        email: "",
        dateofbirth: null
      }
    };
  },
  methods: {
    checkUserExist() {},
    signin() {
      this.isActive = true;
      this.errNoDispose = false;
      login(this.user)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);

            localStorage.setItem("username", this.user.username);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("following", this.user.following);
            localStorage.setItem("friend", res.data.friend);
            this.$store.commit("SET_TOKEN", res.data.token);
            this.$store.commit("SET_FRIEND", res.data.follower);
            this.$store.commit("SET_FOLLOWING", res.data.following);
            this.$store.commit("SET_CURRENT_USER", {
              user: { username: this.user.username }
            });
            this.$store.commit("SET_CURRENT_USERID", {
              userId: res.data.userId
            });
            this.$emit("closeModal");
          }
        })
        .catch(() => {
          this.isActive = false;
          this.errNoDispose = true;
          this.$toast.open({
            duration: 3000,
            message: `Incorrect credentials`,
            position: "is-bottom",
            type: "is-danger"
          });
        });
    },
    removeErr() {
      this.errNoDispose = false;
    },
    signup() {
      this.issignupActive = true;

      let signupUser = {
        username: this.newUser.username,
        password: this.newUser.password,
        email: this.newUser.email,
        dateofbirth: this.newUser.dateofbirth
      };
      signup(signupUser)
        .then(({ data }) => {
          this.issignupActive = false;
          
          if (data.dublicate) {
            this.$toast.open({
              duration: 3000,
              message: `Username already existed`,
              position: "is-top",
              type: "is-danger"
            });
          } else {
            this.$emit("closeModal");
          }
        })
        .catch(err => {
          this.issignupActive = false;
        });
    }
  },
  computed: {
    checkValid() {
      if (this.user.username && this.user.password) {
        return true;
      }
      return false;
    },
    checkSignUpValid() {
      if (
        this.newUser.username &&
        this.newUser.password &&
        this.newUser.dateofbirth &&
        validateEmail(this.newUser.email)
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
.md {
  font-family: "GTEestiDisplayRegular2";
}
input[type="text"] {
  font-family: "GTEestiDisplayRegular2";
}
input[type="email"] {
  font-family: "GTEestiDisplayRegular2";
}
::-webkit-input-placeholder {
  font-family: "GTEestiDisplayRegular2";
}
:-ms-input-placeholder {
  font-family: "GTEestiDisplayRegular2";
}
</style>