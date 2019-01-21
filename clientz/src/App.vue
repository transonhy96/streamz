<template>
  <div id="app">
    <div class="hero is-primary">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">Streamz</router-link>
          <a
            role="button"
            class="navbar-burger burger"
            @click="showNav=!showNav"
            style="color: #283036;"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample " class="navbar-menu" :class="{'is-active':showNav}">
          <div class="navbar-start">
            <router-link to="/directory" class="navbar-item">Browse</router-link>
            <router-link to="/getstart" class="navbar-item">Get started now</router-link>
            
          </div>

          <div class="navbar-end">
            <template v-if="!getIsLogged">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-light" @click="isComponentModalActive = true">Log in</a>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="navbar-item" style="margin-right:60px">
                <b-dropdown v-model="isPublic">
                  <button class="button is-primary" type="button" slot="trigger">
                    <template>
                      <span style="font-family:GTEestiDisplayRegular2;">{{getUser}}</span>
                      <b-icon
                        style="padding-top:8%; padding-left:20%;"
                        pack="fas"
                        icon="angle-down"
                        size="is-small"
                      ></b-icon>
                    </template>
                    <b-icon icon="menu-down"></b-icon>
                  </button>
                  <b-dropdown-item>
                    <div class="media">
                      <b-icon class="media-left" icon="earth"></b-icon>
                      <div class="media-content">
                        <h3>Channel</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="media">
                      <b-icon class="media-left" icon="earth"></b-icon>
                      <div class="media-content" @click="gotoDashBoard">
                        <h3>Dashboard</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="media">
                      <b-icon class="media-left" icon="earth"></b-icon>
                      <div class="media-content">
                        <h3>Friends</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="media" @click="gotoSetting">
                      <b-icon class="media-left" icon="earth"></b-icon>
                      <div class="media-content">
                        <h3>Settings</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <div class="media" @click="logout">
                      <b-icon class="media-left" icon="account-multiple"></b-icon>
                      <div class="media-content">
                        <h3>Log out</h3>
                      </div>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
          </div>
        </div>
      </nav>

      <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <modal v-on:closeModal="isComponentModalActive = false"></modal>
      </b-modal>
    </div>
    <main id="page-wrap">
      <div class="hero content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import { apiPath } from "./config";
import Modal from "@/components/Modal.vue";
import request from "./_helper/request";
export default {
  components: {
    Modal
  },
  data() {
    return {
      isComponentModalActive: false,
      showNav: false,
      showDropdown: false,
      isLogged: false,
      isPublic: true,
      isScroll: false,
      isHidden: true
    };
  },
  computed: {
    getIsLogged() {
      if (this.$store.getters.users.username !== "") return true;
      else {
        return false;
      }
    },
    getUser() {
      return this.$store.getters.users.username;
    }
  },

  methods: {
    showHidden() {
      console.log("click");
      this.isHidden = !this.isHidden;
    },
    cardModal() {
      this.$modal.open({
        parent: this,
        component: Modal,
        hasModalCard: true
      });
    },
    gotoSetting() {
      this.$router.push({
        path: `/directory/channel/${
          this.$store.getters.users.username
        }/settings`
      });
    },
    gotoDashBoard() {
      this.$router.push({
        path: `/${this.$store.getters.users.username}/dashboard`
      });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.setItem("token", "");
      this.$router.push('/directory');
      this.$store.commit("SET_CURRENT_USER", {
        user: { username: "" }
      });
      this.$store.commit("SET_CURRENT_USERID", {
        userId: ""
      });
      localStorage.setItem("username", "");
      localStorage.setItem("userId", "");
    },
    handleScroll: function(event) {
      if (window.scrollY >= 53) {
        this.isScroll = true;
      }
    }
  },
  beforeCreate() {
    request("POST", `/validateToken/token`,
     {
      token: localStorage.getItem("token")
    }).then(({ data }) => {
      console.log(data);
      if (data.valid) {
        try {
          this.$store.commit("SET_CURRENT_USER", {
            user: { username: localStorage.getItem("username") }
          });
          this.$store.commit("SET_CURRENT_USERID", {
            userId: localStorage.getItem("userId")
          });
          this.username = localStorage.getItem("username");
        } catch (err) {}

        if (
          localStorage.getItem("token") !== "" &&
          localStorage.getItem("username") !== ""
        ) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.commit("SET_TOKEN", localStorage.getItem("token"));
    request("GET", "/games", {}).then(res => {
      if (res.data) {
        this.$store.commit("SET_GAMES", res.data);
      }
    });
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="css">
@font-face {
  font-family: GTEestiDisplayRegular2;
  src: url("./assets/fonts/GT-Eesti-Display-Medium-2.woff");
}

#app {
  font-family: "GTEestiDisplayRegular2";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media only screen and (max-width: 1200px) {
  .searchbox {
    display: none;
  }
}
.hide {
  display: none;
}
.navbar {
  -webkit-box-shadow: 1px 3px 2px -1px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 1px 3px 2px -1px rgba(0, 0, 0, 0.22);
  box-shadow: 1px 3px 2px -1px rgba(0, 0, 0, 0.22);
}
.content {
  margin-top: 1%;
}
.searchbox {
  margin-top: 5%;
  margin-left: 30%;
}
.transit {
  transition: all 0.5s ease-in-out;
}
.bm-burger-button {
  margin-top: 30px;
}
.ais-input {
  border-radius: 10px;
  height: 32px;
  outline: none;
}
.ais-search-box__submit {
  display: none;
}
.ais-clear {
  display: none;
}
.result {
  position: absolute;
  top: 50px;
  left: 26%;
  z-index: 1;
  width: 200px;
  padding: 30px;
  color: rgba(0, 0, 0, 0.8);
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
}
textarea {
  font-family: "GTEestiDisplayRegular2";
}
</style>
