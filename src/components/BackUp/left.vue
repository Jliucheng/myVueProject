<template>
    <div id="left" :class="active">
        <ul v-for="(item, index) in videoInfo" v-bind:key="index">
            {{ item.videoname }} {{ "<"+item.videotype+">" }}
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "PaperInput",
    data() {
        return {
            videoInfo: [],
        };
    },
    methods: {
        showEpisode(videoType) {
            //console.log(videoType)
            if (videoType === '电影') {
                return false
            } else {
                return true
            }
        }

    },
    created() {
        axios
            .get('http://43.139.189.22:5173/data/loadView')
            .then((res) => {
                this.videoInfo = res.data
            })
            .catch((err) => {
                alert(err)
            })
    }
};
</script>

<style>
div#left li:active {
    text-decoration: none;
    color: #fff;
    background: #aaa;
}

div#left li:currentLink {
    text-decoration: none;
    color: #ffffff;
    background-color: #BD2D30;
}

div#left li:currentLink li:hover {
    text-decoration: underline;
    color: #ff0000;
    background: transparent;
}
</style>