<template>
    <div style="background-color:burlywood;height: 2rem;">
      <h2>
        Carton
      </h2>
    </div>
    <div class="left">
        <button id="btnHelloWorld" @click="isShowHelloWorld = !isShowHelloWorld">Name</button>
        <button id="btnHelloWorld" @click="isShowHelloWorld = !isShowHelloWorld">Data</button>
    </div>
    <div>
      <div class="view">
        <transition name="hello" appear>
          <div v-show="isShowHelloWorld">
            <CartonName />
          </div>
        </transition>
      </div>
      
      <div class="view">
        <transition name="hello" appear>
          <div v-show="!isShowHelloWorld">
            <CartonData />
          </div>
        </transition>
      </div>
    </div>
  
  </template>
  
  <script>
  import CartonName from "./components/views/name.vue";
  import CartonData from "./components/views/data.vue";
  export default {
    name: "App",
    data() {
      return {
        isShowHelloWorld: true,
        episodeInfoList: []
      }
    },
    components: {
      CartonName,
      CartonData,
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  h1 {
    background-color: orange;
  }
  button {
    border: none;
    padding: 15px 30px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    background: burlywood;
    border-radius: 3px;
    cursor: pointer;
  }
  #btnHelloWorld {
    background: greenyellow;
  }
  /*
  .hello-enter-active {
    animation: atguigu 0.0001s linear;
  }
  .hello-leave-active {
    animation: atguigu 0.0001s linear reverse;
  }
  */
  .left {
    float: left;
    width: 10%;
    display: grid;
    background-color: aliceblue;
  }
  .center {
    display: inline-table;
  }
  .right {
    float: right;
    width: 10%;
    display: grid;
  }
  @keyframes atguigu {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0px);
    }
  }
  </style>