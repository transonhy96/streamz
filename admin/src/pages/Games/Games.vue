<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Games</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col xs="12">
        <Widget
          title="<h5>Games <span class='fw-semi-bold'>Data</span></h5>"
          bodyClass="widget-table-overflow"
          customHeader
          settings
          close
          collapse
        >
          <div class="clearfix">
            <b-row>
              <b-col>
                <b-form class="d-sm-down-none" inline @submit.prevent="search">
                  <b-form-group>
                    <b-input-group class="input-group-no-border">
                      <div class="input-group-addon d-flex align-items-center">
                        <i class="la la-search px-3"/>
                      </div>
                      <b-input
                        v-model="searchQuery"
                        style="width:300px"
                        placeholder=" Search by name"
                        @click="clearSearch"
                        @keyup.native="search"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-form>
              </b-col>

              <b-col lg="6" sm="6" xs="12">
                <div class="float-right mr-3 right">
                  <b-dropdown variant="info" size="lg" no-caret>
                    <template slot="button-content">
                      <i class="la la-cog px-2 la-lg mr-5 hoverIcon" id="ddown-header"/>
                    </template>
                    <b-dropdown-item @click="addGame" class="text-success">Add</b-dropdown-item>
                    <b-dropdown-item
                      v-if="getSelected"
                      class="text-danger"
                      v-b-modal="'gameDeleteModal'"
                    >Delelte</b-dropdown-item>
                  </b-dropdown>&nbsp
                  <i
                    class="la la-angle-left px-2 la-lg ml-3 hoverIcon"
                    @click="toPreviousPage"
                  />
                  Page {{startPage}} / {{page}} &nbsp
                  <i
                    class="la la-angle-right px-2 la-lg ml-3 hoverIcon"
                    @click="toNextPage"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="table-responsive table-hover">
            <table class="table table-lg mb-0">
              <thead>
                <tr class="text-muted">
                  <th></th>
                  <th>#</th>
                  <th>Image Cover</th>
                  <th @click="filterName">Full Name</th>
                  <th>Short Name</th>

                  <th @click="filterView">Views</th>
                  <th>Genre</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row,index) in filtereds" :key="row.id">
                  <td>
                    <div class="abc-checkbox">
                      <input
                        type="checkbox"
                        :id="'checkbox'+row.ShortName"
                        @change="changeCheck(index,row)"
                        :checked="checks[index]"
                      >
                      <label :for="'checkbox' +row.ShortName"/>
                    </div>
                  </td>
                  <td>{{index}}</td>
                  <td @click="showDetailPage(row)">
                    <v-lazy-image class="img-round" height="80" width="60" :src="row.Image_Cover"/>
                  </td>
                  <td @click="showDetailPage(row)">{{row.FullName}}</td>
                  <td @click="showDetailPage(row)">{{row.ShortName}}</td>
                  <td @click="showDetailPage(row)">{{row.Views}}</td>
                  <td style="display:flex;flex-wrap:wrap;" @click="showDetailPage(row)">
                    <b-row>
                      <b-col lg="8">
                        <b-container>
                          <b-badge
                            v-for="r in row.Type"
                            href="#"
                            :variant="variant[getRandom()]"
                            class="mr-3 ml-3 mt-3"
                          >{{r.Name}}</b-badge>
                        </b-container>
                      </b-col>
                    </b-row>
                  </td>
                  <td class="hoverTd">
                    {{parseDate(row.CreatedAt)}}
                    <i
                      class="more la la-times px-2 la-lg mt-3 text-default"
                      @click="openDeleteModal(row)"
                      v-b-modal="'gameDeleteModal'"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <b-modal
      title="Confirmation"
      id="gameDeleteModal"
      centered
      @ok="handleDelete"
      ok-title="Confirm"
      cancel-title="Dismiss"
      cancel-variant="info"
      ok-variant="danger"
      :lazy="true"
    >
      <b-container>
        <b-row>Are you sure want to delete {{selectedGames.length || ''}} games ?</b-row>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
import moment from "moment";
import axios from "axios";
import Vue from "vue";
import VLazyImage from "v-lazy-image";
export default {
  name: "GamesPage",
  components: { Widget, VLazyImage },
  data() {
    return {
      games: [],
      filtereds: [],
      checks: [],
      selectedGames: [],
      pointedGame: [],
      searchQuery: "",
      clicked: false,
      viewClicked: false,
      totalPage: 0,
      pageSize: 0,
      nextPage: "",
      page: 0,
      startPage: 1,
      variant: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark"
      ]
    };
  },
  computed: {
    getSelected(){
      return this.selectedGames.length > 0 ? true : false;
    }
  },
  methods: {
    getRandom() {
      return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
    },
    openDeleteModal(row) {
      this.$store.commit("layout/setPointedGame", row);
    },

    handleDelete() {
      if (this.selectedGames.length !== 0) {
        let arr = this.selectedGames.map(e => {
          return { _id: e._id };
        });
        axios
          .delete("http://localhost:3000/admin/games", {
            headers: { "x-access-token": localStorage.getItem("token_admin") },
            data: arr
          })
          .then(({ data }) => {
            if (data.success) {
              axios
                .get(
                  "http://localhost:3000/api/games/pages/" + this.startPage,
                  {
                    headers: {
                      "x-access-token": localStorage.getItem("token_admin")
                    }
                  }
                )
                .then(({ data }) => {
                  this.games = this.filtereds = data.game;
                  this.page = (data.page_size / data.total + 1).toFixed();
                  this.totalPage = data.total;
                  this.pageSize = data.page_size;
                  this.nextPage = data.next_page;
                  this.checks = Array(this.games.length);
                  for (let i = 0; i < this.games.length; i++) {
                    this.checks[i] = false;
                  }
                });
            }
          });
      }
    },

    addGame() {
      this.$router.push("/app/components/games/new");
    },
    updateGame() {
      this.$router.push("/app/components/games/update");
    },
    deleteGame() {
      
    },
    showDetailPage(r) {
      this.$store.commit("layout/setPointedGame", r);
      this.$router.push(`/app/components/games/update`);
    },
    checkAll(ev, checkbox) {
      const checkboxArr = new Array(checkbox.length);
      for (let i = 0; i < this.checks.length; i++) {
        checkboxArr[i] = ev.target.checked;
      }
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(index, r) {
      this.$store.commit("layout/setPointedGame", r);
      let notExist = true;
      this.selectedGames.find(e => {
        if (e._id == r._id) {
          notExist = false;
        }
      });
      if (notExist) {
        this.selectedGames.push(r);
      }
      this.checks[index] = !this.checks[index];
    },
    parseDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    count(date) {
      return moment(date).fromNow();
    },
    showDetail(r) {},
    search() {
      if (this.searchQuery !== "") {
        this.filtereds = this.filtereds.filter(
          op =>
            op.FullName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) ==
            0
        );
      } else {
        this.filtereds = this.games;
      }
    },
    clearSearch() {
      this.searchQuery = "";
    },
    filterName() {
      this.clicked = !this.clicked;
      if (this.clicked) {
        this.filtereds.sort(function(a, b) {
          var nameA = a.FullName.toLowerCase(),
            nameB = b.FullName.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else {
        this.filtereds.sort(function(a, b) {
          var nameA = a.FullName.toLowerCase(),
            nameB = b.FullName.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      }
    },
    filterView() {
      this.viewClicked = !this.viewClicked;
      if (this.viewClicked) {
        this.filtereds.sort((a, b) => {
          let pre = a.Views;
          let next = b.Views;
          if (pre < next) return -1;
          if (pre > next) return 1;
          return 0;
        });
      } else {
        this.filtereds.sort((a, b) => {
          let pre = a.Views;
          let next = b.Views;
          if (pre < next) return 1;
          if (pre > next) return -1;
          return 0;
        });
      }
    },
    toNextPage() {
      this.startPage++;

      axios
        .get("http://localhost:3000/api/games/pages/" + this.startPage, {
          headers: { "x-access-token": localStorage.getItem("token_admin") }
        })
        .then(({ data }) => {
          this.games = this.filtereds = data.game;
          this.page = (data.page_size / data.total + 1).toFixed();
          this.totalPage = data.total;
          this.pageSize = data.page_size;
          this.nextPage = data.next_page;
          this.checks = Array(this.games.length);
          for (let i = 0; i < this.games.length; i++) {
            this.checks[i] = false;
          }
        });
    },
    toPreviousPage() {
      this.startPage--;
      axios
        .get("http://localhost:3000/api/games/pages/" + this.startPage, {
          headers: { "x-access-token": localStorage.getItem("token_admin") }
        })
        .then(({ data }) => {
          this.games = this.filtereds = data.game;
          this.page = (data.page_size / data.total + 1).toFixed();
          this.totalPage = data.total;
          this.pageSize = data.page_size;
          this.nextPage = data.next_page;
          this.checks = Array(this.games.length);
          for (let i = 0; i < this.games.length; i++) {
            this.checks[i] = false;
          }
        });
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/games/pages/" + this.startPage, {
        headers: { "x-access-token": localStorage.getItem("token_admin") }
      })
      .then(({ data }) => {
        this.games = this.filtereds = data.game;
        this.page = (data.page_size / data.total + 1).toFixed();
        this.totalPage = data.total;
        this.pageSize = data.page_size;
        this.nextPage = data.next_page;
        this.checks = Array(this.games.length);
        for (let i = 0; i < this.games.length; i++) {
          this.checks[i] = false;
        }
      });
  }
};
</script>
<style src="./Games.scss" lang="scss" />
