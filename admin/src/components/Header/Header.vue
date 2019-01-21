<template>
  <b-navbar class="header d-print-none">
  
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class="la la-bars la-lg"/>
        </a>
        <b-tooltip target="barsTooltip" placement="bottom">Pin sidebar</b-tooltip>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <span class="rounded rounded-lg bg-gray text-white d-md-none">
            <i class="la la-bars la-lg"/>
          </span>
          <i class="la la-bars la-lg d-sm-down-none ml-4"/>
        </a>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <a href="#" class="px-2" id="goback" @click="goback">
          <i class="la la-long-arrow-left la-lg"/>
        </a>
        <b-tooltip target="goback" placement="bottom">Go back</b-tooltip>
      </b-nav-item>
    </b-nav>

    <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-gray mr-n-sm"/>
      <i class="fa fa-circle text-warning"/>
      &nbsp;
      Streamz
      &nbsp;
      <i class="fa fa-circle text-warning mr-n-sm"/>
      <i class="fa fa-circle text-gray"/>
    </a>
    <b-nav class="ml-auto">
      <b-nav-item-dropdown
        id="basic-nav-dropdown"
        class="notificationsMenu d-sm-down-none mr-2"
        extra-menu-classes="notificationsWrapper py-0 animated animated-fast fadeInUp"
        right
      >
        <template slot="button-content">
          <span class="avatar thumb-sm float-left mr-2">
            <img class="rounded-circle" src="../../assets/avatar/streamz.svg" alt="...">
          </span>
          <span class="small">
            <span class="fw-semi-bold">Admin</span>
          </span>
          <span class="ml-1 circle bg-warning text-white fw-bold">10</span>
        </template>
        <Notifications/>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class="la la-cog px-2"/>
        </template>
        <b-dropdown-item @click="myAcc">
          <i class="la la-user"/> My Account
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item>
          <router-link to="/app/dashboard" class="d-flex">Dashboard</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="/app/components/channels" class="d-flex">Manipulate data</router-link>
        </b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item-button @click="logout">
          <i class="la la-sign-out"/> Log Out
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
      <b-nav-item>
        <a class="d-sm-down-none px-2" id="toggle-chat" href="#" @click="toggleChat">
          <i class="la la-globe"/>
        </a>
      </b-nav-item>
      <b-nav-item class="fs-lg d-md-none">
        <a href="#" @click="toggleChat">
          <span class="rounded rounded-lg bg-gray text-white">
            <i class="la la-globe"/>
          </span>
        </a>
      </b-nav-item>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import Notifications from "@/components/Notifications/Notifications";

export default {
  name: "Headed",
  components: { Notifications },
  computed: {
    ...mapState("layout", {
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic
    })
  },
  methods: {
    ...mapActions("layout", [
      "toggleSidebar",
      "toggleChat",
      "switchSidebar",
      "changeSidebarActive"
    ]),
    myAcc(){
      this.$router.push(`/app/account/`);
    },
    goback() {
      const paths = this.$route.fullPath.split("/");

      if (paths.length > 3) {
        paths.pop();
        this.$router.back();
      }
    },
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
    logout() {
      window.localStorage.setItem("authenticated", false);
      window.localStorage.setItem("token_admin", "");
      this.$store.commit("layout/setAuth",false);
      this.$router.push("/login");
    }
  },
  created() {
    if (window.innerWidth > 576) {
      setTimeout(() => {
        const $chatNotification = $("#chat-notification");
        $chatNotification
          .removeClass("hide")
          .addClass("animated fadeIn")
          .one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            () => {
              $chatNotification.removeClass("animated fadeIn");
              setTimeout(() => {
                $chatNotification
                  .addClass("animated fadeOut")
                  .one(
                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd" +
                      " oanimationend animationend",
                    () => {
                      $chatNotification.addClass("hide");
                    }
                  );
              }, 6000);
            }
          );
        $chatNotification
          .siblings("#toggle-chat")
          .append('<i class="chat-notification-sing animated bounceIn"></i>');
      }, 4000);
    }
  }
};
</script>

<style src="./Header.scss" lang="scss" scoped />
