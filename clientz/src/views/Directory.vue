<template>
  <div class="columns">
    <div class="column is-2 side">
      <aside class="menu">
        <p class="menu-label">Followed Channels</p>
        <ul class="menu-list">
          <li v-for="f in following">
            <section v-if="!f" class="section"> You have'nt follow any channel yet</section>
            <a>{{f.username}}</a>
          </li>
        </ul>

        <p class="menu-label">Online Friends</p>
        <ul class="menu-list">
          <li v-for="fr in friend">
            <section v-if="!fr" class="section"> You have no friend</section>
            <a>{{fr.Name}}</a>
          </li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <div class="columns">
        <div class="column is-one-fifth" style="max-width:210px!important">
          <small>Showing</small>
          <br>
          <b-dropdown v-model="isPublic">
            <button class="button" type="button" slot="trigger" >
              <template v-if="isPublic">
                <span>Games</span>
              </template>
              <template v-else>
                <span>Channels</span>
              </template>&nbsp&nbsp
              <i class="fas fa-caret-down"></i>
            </button>

            <b-dropdown-item :value="true"  @click="change('games')">
              <p>Games</p>
            </b-dropdown-item>

            <b-dropdown-item :value="false"  @click="change('live_channels')">
              <p>Channels</p>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="column" v-if="hideAtChannel">
          <small>Filter</small>
          <br>
          <div class="columns">
            <div class="column is-one-fifth" style="max-width:220px">
              <template v-if="!showFilter">
                <button class="button filter" @click="show">
                  Add filter &nbsp &nbsp
                  <i style="color:grey;font-size:10px" class="fas fa-plus"></i>
                </button>
              </template>
              <template v-else>
                <b-autocomplete
                  v-model="name"
                  placeholder="Tags"
                  icon="search fa-sm"
                  icon-pack="fa"
                  :keep-first="keepFirst"
                  :open-on-focus="openOnFocus"
                  :data="filteredDataObj"
                  field="Name"
                  @select="option => selected = option"
                  @click.native="emptyInput"
                ></b-autocomplete>
              </template>
            </div>
            <div class="column header">
              <nav v-if="checkEmpty" class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
                <ul >
                  <li v-for="type in getType">
                    <a>{{type.Name}}</a>
                  </li>
                  &nbsp
                  <i class="fas fa-times fa-sm" style="color:gray; font-size:12px; cursor:pointer" @click="removeType"></i>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-8">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import request from "../_helper/request";

export default {
  name: "directory",
  components: {},
  data() {
    return {
      isPublic: true,
      showFilter: false,
      hideAtChannel:true,
      data: [],
      name: "",
      keepFirst: true,
      openOnFocus: true,
      selected: null,
      isFetching: false,
      friend:[],
      following:[],
    };
  },
  computed: {
    getType() {
      return this.$store.getters.type;
    },
    filteredDataObj() {
      return this.data.filter(option => {
        return (
          option.Name.toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        );
      });
    },
    checkEmpty() {
      if (this.$store.getters.type.length > 0) {
        return true;
      }
      return false;
    }
  },
  watch: {
    selected: function(val) {
      if (val) {
        this.$store.commit("SET_FILTER_GAMES", {
          _id: val._id,
          Name: val.Name
        });
      }
    }
  },
  methods: {
    show() {
      this.showFilter = true;
    },
    removeType() {
      this.$store.commit("REMOVE_TYPE");
    },
    emptyInput() {
      this.name = "";
    },
    change(e){
      if(e==='games'){
          this.$router.push({ path: '/directory'});
          this.hideAtChannel = true;
      }
      else if(e==="live_channels"){
        this.$router.push({ path: '/directory/all'});
        this.hideAtChannel = false;
      }
    }
  },
  created(){
     this.friend= window.localStorage.getItem('following') || this.$store.getters.friend ;
     this.following =window.localStorage.getItem('friend') || this.$store.getters.following;
  },
  beforeCreate() {
    request("GET", "/game_types", {})
      .then(({ data }) => {
        this.data = [];
        data.game_type.forEach(element => {
          this.data.push(element);
        });
      })
      .catch(error => {
        this.data = [];
        throw error;
      })
      .finally(() => {
        this.isFetching = false;
      });
  }
};
</script>
<style scoped>
.menu-list {
  list-style: none;
}

.menu-label {
  margin-left: 10%;
}
.filter {
  border-style: dashed;
}
.header {
  display: inline-flex;
  flex-wrap: nowrap;
}
.header > button {
  margin-right: 5px;
}
.force-overflow {
  min-height: 450px;
}
.breadcrumb{
    margin-top:0px;
}
button{
  font-family: "GTEestiDisplayRegular2";
  font-size:16px;
}
</style>

