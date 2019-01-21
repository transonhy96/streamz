<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Genre</b-breadcrumb-item>
    </b-breadcrumb>
    <b-container>
      <b-row>
        <b-col lg="6">
          <Container @drop="onDrop">
        <Draggable v-for="g in genres" >
          <div class="draggable-item flex-col">
            
              <Widget :title="title" bodyClass="widget-table-overflow" 
              customHeader 
              close
               collapse>
                <div class="clearfix mb-3">
                  <b-container class="mr-5 ml-5 mt-5 mb-5">
                     <b-row>
                    <b-col lg="5" md="5" sm="12">{{g.Name}}</b-col>
                  </b-row>
                  </b-container>
                 
                  
                </div>
              </Widget>
          </div>
        </Draggable>
      </Container>
        </b-col>
        
      </b-row>
      

    </b-container>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
import { Container, Draggable } from "vue-smooth-dnd";
import axios from "axios";

export default {
  name: "GenrePage",
  components: { Widget, Container, Draggable },
  data() {
    return {
      title: "",
      genres: [],
      genres_:[],
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
    getSelected() {
      return this.selectedGames.length > 0 ? true : false;
    }
  },
  methods: {
    onDrop(){

    }
  },
  created() {
    axios.get("http://localhost:3000/api/game_types").then(({ data }) => {
      
      let x = Math.round(data.game_type.length/2);
     for(let j =0;j<x;j++){
       this.genres.push(data.game_type[j]);
     }
      for(let i=x;i<data.game_type.length;i++){
        this.genres_.push(data.game_type[i]);
      }

      
    });
  }
};
</script>
<style src="./Genre.scss" lang="scss" />
