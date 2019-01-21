<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Channels</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col xs="12">
        <Widget
          title="<h5>Channels <span class='fw-semi-bold'>Data</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader
          close
          collapse
        >
          <div class="clearfix mb-3">
            <b-row>
              <b-col lg="6" sm="6" xs="12">
                <b-form class="d-sm-down-none" inline @submit.prevent="search">
                  <b-form-group>
                    <b-input-group class="input-group-no-border">
                      <div class="input-group-addon d-flex align-items-center">
                        <i class="la la-search px-3"/>
                      </div>
                      <b-input
                        v-model="searchQuery"
                        style="width:300px"
                        placeholder="Username"
                        @click="clearSearch"
                        @keyup.native="search"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-form>
              </b-col>
              <b-col lg="6" sm="6" xs="12">
                <div class="float-right mr-3">
                  <b-tooltip target="refresh" placement="top">Refresh Data</b-tooltip>
                  <i class="la la-refresh p-3 la-lg ml-3 hoverIcon" id="refresh" @click="refresh"/>
                  &nbspPage 1 / 1 &nbsp
                  <i
                    class="la la-angle-right px-3 la-lg ml-3 hoverIcon"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="table-responsive table-hover">
            <table class="table table-lg mb-0">
              <thead>
                <tr class="text-muted">
                  <th>#</th>
                  <th @click="filterName">Username</th>
                  <th>Email</th>
                  <th>Born</th>
                  <th>Avartar</th>
                  <th @click="filterView">Views</th>
                  <th>Created</th>
                  <th>Followers</th>
                  <th>Followings</th>
                  <th>Friends</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,index) in filtereds" :class="{'hoverIn':checks[index]}">
                  <td>{{index}}</td>
                  <td>{{row.Username}}</td>
                  <td>{{row.Email}}</td>
                  <td>{{parseDate(row.DateofBirth)}}</td>
                  <td>
                    <v-lazy-image
                      class="img-rounded avatar"
                      height="50"
                      width="50"
                      :src="row.Profile_Picture"
                      alt
                    />
                  </td>
                  <td>{{row.Views}}</td>
                  <td>{{count(row.CreatedAt)}}</td>
                  <td>{{row.Followers.length}}</td>
                  <td>{{row.Followings.length}}</td>
                  <td @click="showDetail(row)">
                    {{row.Friends.length}}
                    <i class="more la la-long-arrow-right px-2 la-lg"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
import moment from "moment";
import axios from "axios";
import Vue from "vue";
import VLazyImage from "v-lazy-image";
export default {
  name: "ChannelsPage",
  components: { Widget, VLazyImage },
  data() {
    return {
      channels: [],
      filtereds: [],
      checks: [],
      pointedChannel: [],
      searchQuery: "",
      clicked: false,
      checkAllClick: false
    };
  },
  computed: {
    getCheck(index) {
      return this.checks[index];
    }
  },
  methods: {
    refresh() {
      axios
        .get("http://localhost:3000/admin/channels/pages/1", {
          headers: { "x-access-token": localStorage.getItem("token_admin") }
        })
        .then(({ data }) => {
          this.channels = this.filtereds = data.channel;
        })
        .catch();
    },
    checkAll(ev, checkbox) {
      const checkboxArr = new Array(checkbox.length);
      for (let i = 0; i < this.checks.length; i++) {
        checkboxArr[i] = ev.target.checked;
      }
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, index, row) {
      this.checks[index] = ev.target.checked;
      this.$store.commit("layout/setPointedChannel", row);
    },
    parseDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    count(date) {
      return moment(date).fromNow();
    },
    search() {
      if (this.searchQuery !== "") {
        this.filtereds = this.filtereds.filter(
          op => op.Username.indexOf(this.searchQuery.toLowerCase()) == 0
        );
      } else {
        this.filtereds = this.channels;
      }
    },
    clearSearch() {
      this.searchQuery = "";
    },
    filterName() {
      this.clicked = !this.clicked;
      if (this.clicked) {
        this.filtereds.sort(function(a, b) {
          var nameA = a.Username.toLowerCase(),
            nameB = b.Username.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else {
        this.filtereds.sort(function(a, b) {
          var nameA = a.Username.toLowerCase(),
            nameB = b.Username.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      }
    },
    filterView() {
      this.filtereds.sort((a, b) => {
        let pre = a.Views;
        let next = b.Views;
        if (pre < next) return -1;
        if (pre > next) return 1;
        return 0;
      });
    },
    showDetail(r) {
      this.$store.commit("layout/setPointedChannel", r);
      this.$router.push(`/app/components/channels/${r.Username}`);
    }
  },
  created() {},
  beforeCreate() {
    axios
      .get("http://localhost:3000/admin/channels/pages/1", {
        headers: { "x-access-token": localStorage.getItem("token_admin") }
      })
      .then(({ data }) => {
        this.channels = this.filtereds = data.channel;
        this.checks = Array(data.channel.length);
        for (let i = 0; i < data.channel.length; i++) {
          this.checks[i] = false;
        }
      });
  }
};
</script>
<style src="./Channels.scss" lang="scss" />
