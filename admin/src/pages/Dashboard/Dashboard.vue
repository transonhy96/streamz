<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item>
      <b-breadcrumb-item active>Dashboard</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">Dashboard</h1>
    <b-row>
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Highest game search">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>{{mostViewGame.Views}}</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            
                  <b-row>
                    <b-col lg="3" md="3" xl="6">
                      <v-lazy-image width="100%" :src="mostViewGame.Image_Cover"/>
                    </b-col>
                  </b-row>
              
          </Widget>
        </div>
      </b-col>
      
      <b-col lg="3" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Api Perfomance">
            <p class="text-muted d-flex flex-wrap">
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-success text-success mr-xs" style="font-size: 4px;">.</span>
                  This Period
              </small>
              <small class="mr-lg d-flex align-items-center">
                <span class="circle bg-warning text-warning mr-xs" style="font-size: 4px;">.</span>
                Last Period
              </small>
            </p>
            <h6>Requests</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="success" :value="60" :max="100" />
            <b-progress class="mb" style="height: 5px"
              variant="warning" :value="35" :max="100" />
            <h6>Errors</h6>
            <b-progress class="mb-xs" style="height: 5px"
              variant="success" :value="40" :max="100" />
            <b-progress style="height: 5px"
              variant="warning" :value="55" :max="100" />
          </Widget>
        </div>
      </b-col>
      <b-col lg="5" sm="6" xs="12">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="Media server status">
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>60% / 37°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#ffc247']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center mb-sm">
              <p class="width-150"><small>54% / 31°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#9964e3']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="d-flex align-items-center">
              <p class="width-150"><small>57% / 21°С / 3.3 Ghz</small></p>
              <div style="width: calc(100% - 150px)">
                <trend
                  :data="getRandomData()"
                  :gradient="['#3abf94']"
                  :height="30"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    
    <b-row>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-primary mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Media server</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">4,232</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+830</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>4.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Streamz</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">754</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+30</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>2.5%</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
      <b-col lg="4" sm="6" xs="12">
        <Widget
          title="<h5 class='d-flex align-items-center pb-1'>
            <span class='circle bg-warning mr-sm' style='font-size: 6px;'></span>
            Statistic<span class='fw-normal ml-xs'>Api</span>
          </h4>"
          bodyClass="p-0 mt"
          customHeader
        >
          <h4 class="fw-semi-bold ml-lg mb-lg">1,025</h4>
          <div class="d-flex border-top">
            <div class="w-50 border-right p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>+230</h6>
                <i class="la la-arrow-right text-success rotate-315" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Registrations</small>
              </p>
            </div>
            <div class="w-50 p-3 px-4">
              <div class="d-flex justify-content-between align-items-center"><h6>21.5%</h6>
                <i class="la la-arrow-right text-danger rotate-45" />
              </div>
              <p class="text-muted mb-0 mr">
                <small>Bounce Rate</small>
              </p>
            </div>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import Widget from '@/components/Widget/Widget';
import axios from 'axios';
import VLazyImage from 'v-lazy-image';
import io from 'socket.io-client';
export default {
  name: 'Dashboard',
  components: { Widget,VLazyImage },
  data() {
    return {
      mostViewGame:{},
      socket:io('localhost:8000')
      
    };
  },
  mounted(){
      this.socket.on('sysInfo',data=>{
        console.log(data);
      })
  },
  created(){
    axios({
      method:"GET",
      url:"http://localhost:3000/api/games/top1",
      
    })
    .then(({data})=>{
      console.log(data.g[0]);
      this.mostViewGame = data.g[0];
    })
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    getData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    },
    
  },
  
}
</script>

<style src="./Dashboard.scss" lang="scss" scoped />
