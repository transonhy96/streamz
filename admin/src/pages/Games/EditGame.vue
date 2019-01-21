<template>
  <Edit />
</template>
<script>

import { mapState, mapActions, mapGetters } from "vuex";
import axios from "axios";
import store from "../../store";
import Edit from "@/components/EditGame/Edit";
export default {
  name: "GamesEditPage",
  components: {
    Edit
  },
  data() {
    return {
        isAddnew:false,
        gameOb:{},
    };
  },

  computed: {
    ...mapGetters("layout", ["getPointedGame"]),
    
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.method == "new") {
      store.commit("layout/setPointedGame", {});
      store.commit("layout/setAction", "new");

      next();
    } else if (to.params.method == "update") {
      if (store.getters["layout/getPointedGame"].length !== 0) {
        store.commit("layout/setAction", "update");
        next();
      } else {
        next("/app/components/games");
      }
    } else {
      next("/app/components/games");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "GamesPage") {
      store.commit("layout/setPointedGame", {});
      next();
    }
    next();
  },
  created() {
    this.gameOb = this.$store.getters["layout/getPointedGame"];
  },
  beforeCreate() {
    this.gameOb = this.$store.getters["layout/getPointedGame"];
    if(this.$store.getters["layout/getAction"]=="new"){
      this.isAddnew = true;
    }
    else{
      this.isAddnew = false;
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
    getSelectedItem(val) {
      let arrs = this.types.find(op => {
        if (op._id == val) return op.Name;
        return false;
      });
      let arr = { _id: arrs._id, Name: arrs.Name };
      console.log(arr);

      if (this.$store.getters["layout/getAction"] == "new") {
        let isExisted = false;
        if (this.newType.length > 0) {
          this.newType.find(e => {
            if (e.Name == arr.Name) {
              isExisted = true;
            }
          });
          if (isExisted) {
            this.newType.push(arr);
          }
        } else {
          this.newType.push(arr);
        }
      } else if (this.$store.getters["layout/getAction"] == "update") {
        let isExistedx = false;
        if (this.game._id) {
          this.game.Type.find(op => {
            if (op.Name == arr.Name) {
              isExistedx = true;
            }
          });
        }
        if (isExistedx) {
          this.game.Type.push(arr);
        }
      }
    },
    handleUpload() {},
    handleSave() {},
    removeAll() {
      this.game.Type = [];
    },
    addMoreType() {
      this.showOption = !this.showOption;
    },
    removeType(g, t) {
      if (g) {
        g.Type.forEach((e, i) => {
          if (e.Name == t.Name) {
            g.Type.splice(i, 1);
          }
        });
        this.gameAfterRemove = g;
      } else {
      }
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
<style src="./EditGame.scss" lang="scss" />
