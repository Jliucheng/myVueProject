<template>
    <div>
      <div>
        <input
          class="inputStyle"
          type="text"
          placeholder="videoname"
          v-model.trim="VideoName"
        />
        <button id="btnsearchName" @click="searchName()">Search DB Data</button>
        <button id="btnsearchName" @click="search()">Back to Initial</button>
      </div>
      <table>
        <tr>
          <th>VideoName</th>
          <th>Episode</th>
          <th>CheckUpTime</th>
          <th>Duration(Mins)</th>
          <th>Week</th>
        </tr>
        <tr v-for="(item, index) in episodeInfoList" v-bind:key="index">
          <td>{{ item.videoname }}</td>
          <td>
            <a :href="'https://okjx.cc/?url=' + item.videourl" target="_blank">{{
              item.episode
            }}</a>
          </td>
          <td>{{ item.checkUpTime }}</td>
          <td>{{ Math.trunc(item.duration/60) }}</td>
          <td>{{ this.calcWeek(item.checkUpTime) }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        VideoName: "",
        episodeInfoList: [],
      };
    },
    methods: {
      calcWeek(checkUpTime) {
        let date = new Date(checkUpTime);
        let day = date.getDay();
        let weeks = new Array(
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        );
        return weeks[day];
      },
      searchName(){
        axios
        .get("http://43.139.189.22:5173/data/searchName",
        {
          params:{
            videoname: this.VideoName
          }
        }
        )
        .then((res) => {
          //console.log(res.data)
          this.episodeInfoList = res.data;
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
      },
      search(){
        axios
        .get("http://43.139.189.22:5173/data/search")
        .then((res) => {
          //console.log(res.data)
          this.episodeInfoList = res.data;
        })
        .catch((err) => {
          console.log("获取数据失败" + err);
        });
      }
    },
    mounted() {
      this.search()
    },
  };
  </script>
  
  <style>
  table {
    border: 2px solid #42b983;
    border-radius: 3px;
    background-color: #fff;
  }
  th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
  }
  td {
    background-color: #f9f9f9;
  }
  th,
  td {
    min-width: 120px;
    padding: 10px 20px;
  }
  th.active {
    color: #fff;
  }
  th.active .arrow {
    opacity: 1;
  }
  </style>