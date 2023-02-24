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
        <button id="btnsearchName" @click="insertName()">Add Data To DB</button>
      </div>
      <table>
        <tr>
          <th>videoname</th>
          <th>update_episode</th>
          <th>VideoType</th>
          <th>Operation</th>
        </tr>
        <tr v-for="(item, index) in names" v-bind:key="index">
          <td>{{ item.videoname }}</td>
          <td>{{ item.update_episode }}</td>
          <td>{{ item.videotype }}</td>
          <td>
            <button
              id="btndelete"
              @click="
                deleteVideo((dataid = item.dataid), (VideoName = item.videoname))
              "
            >
              Delete
            </button>
            <button
              id="btnrefresh"
              @click="
                refresh(
                  (dataid = item.dataid),
                  (VideoName = item.videoname),
                  (update = item.update_episode)
                )
              "
            >
              Refresh
            </button>
            <button
              id="btngetdetail"
              @click="
                GetDetail(
                  (dataid = item.dataid),
                  (VideoName = item.videoname),
                  (update = item.update_episode),
                  (videotype = item.videotype),
                  (isShow = !isShow)
                )
              "
            >
              Detail
            </button>
          </td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        isShow: false,
        names: [],
        dataid: "",
        update: 0,
        VideoName: "",
        videotype: "",
        episodeInfoList: [],
      };
    },
    components: {},
    methods: {
      insertName() {
        axios
          .get("http://43.139.189.22:5173/name/insertName", {
            params: {
              videoname: this.VideoName,
            },
          })
          .then((res) => {
            //console.log(res.data);
            //this.names = res.data;
            if (res.data.status == 200) {
              alert(res.data.msg);
            } else {
              alert(this.VideoName + " Inserted succefully");
            }
            this.search();
          })
          .catch((err) => {
            console.log("获取数据失败" + err);
            alert(err);
          });
      },
      search() {
        axios
          .get("http://43.139.189.22:5173/name/search")
          .then((res) => {
            //console.log(res.data);
            this.names = res.data;
          })
          .catch((err) => {
            console.log("获取数据失败" + err);
          });
      },
      searchName() {
        axios
          .get("http://43.139.189.22:5173/name/searchName", {
            params: {
              videoname: this.VideoName,
            },
          })
          .then((res) => {
            //console.log(res.data);
            this.names = res.data;
          })
          .catch((err) => {
            console.log("获取数据失败" + err);
          });
      },
      deleteVideo() {
        axios
          .get("http://43.139.189.22:5173/name/deleteVideo", {
            params: {
              dataid: this.dataid,
            },
          })
          .then(() => {
            //console.log(res.data)
            alert(this.VideoName + " Deleted succefully");
            this.search();
          })
          .catch((err) => {
            console.log("获取数据失败" + err);
          });
      },
      refresh() {
        axios
          .get("http://43.139.189.22:5173/name/refresh", {
            params: {
              videoname: this.VideoName,
              dataid: this.dataid,
              update: this.update,
            },
          })
          .then((res) => {
            //console.log(res.data);
            //this.names = res.data;
            if (res.data.status == 200) {
              alert(res.data.msg);
            } else {
              alert(res.data);
            }
            this.search();
          })
          .catch((err) => {
            console.log("获取数据失败" + err);
            alert(err);
          });
      },
      GetDetail() {
        axios
          .get("http://43.139.189.22:5173/data/loadData", {
            params: {
              videoname: this.VideoName,
              dataid: this.dataid,
              update: this.update,
              videotype: this.videotype
            },
          })
          .then((res) => {
            //this.episodeInfoList = res.data;
            //console.log(this.episodeInfoList.length)
            /*
            for (let i = 0; i < res.data.length; i++) {
              //console.log(i.toString())
              if (res.data[i.toString()].duration > 60) {
                //console.log(i.toString() + res.data[i.toString()].url);
                axios
                  .get("http://43.139.189.22:5173/data/insertData", {
                    params: {
                      dataid: this.dataid,
                      videoid: res.data[i.toString()].id,
                      videoname: this.VideoName,
                      episode: res.data[i.toString()].title,
                      checkUpTime: res.data[i.toString()].checkUpTime,
                      videourl: res.data[i.toString()].url,
                      duration: res.data[i.toString()].duration
                    }
                  })
                  .then(() => {
                    //console.log(this.VideoName + res.data[i.toString()].title)
                  })
                  .catch((err) => {
                    console.log("获取数据失败: insertData  " + err);
                  })
              }
            }*/
            if(typeof(res.data)===typeof([])){
              alert(this.VideoName + "Inserted Sucessfully");
            }else{alert(res.data);}
            
          })
          .catch((err) => {
            console.log("获取数据失败: loadData  " + err);
            alert(err);
          });
      },
    },
    mounted() {
      this.search();
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
    min-width: 80px;
    padding: 10px 10px;
  }
  th.active {
    color: #fff;
  }
  th.active .arrow {
    opacity: 1;
  }
  #btnsearchName {
    background: rgb(210, 105, 30);
  }
  #btndelete {
    background: rgb(252, 4, 4);
  }
  #btnrefresh {
    background: rgb(253, 4, 178);
  }
  #btngetdetail {
    background: rgb(3, 250, 217);
  }
  .inputStyle {
    text-align: center;
    /*主要就是这个，下面的都是样式*/
    height: 3rem;
    border: 1px solid #5a5e66;
    width: 60%;
    font-size: 14px;
    line-height: 48px;
    border-radius: 3px;
    outline: none;
    /*outline设置为空，可以达到输入框激活状态时不出现方框*/
  }
  </style>