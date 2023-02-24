<template>
    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1', '2', '3']">
        <Submenu name="1">
            <template #title>
                <Icon type="ios-navigate"></Icon>
                动漫
            </template>
            <div v-for="(item, index) in carton_videoInfo" v-bind:key="index">
                <MenuItem :name="'1-' + (index + 1)" @click="getVideoInfo(item)">{{ item.videoname }}
                </MenuItem>
            </div>
        </Submenu>
        <Submenu name="2">
            <template #title>
                <Icon type="ios-keypad"></Icon>
                电视剧
            </template>
            <div v-for="(item, index) in display_videoInfo" v-bind:key="index">
                <MenuItem :name="'2-' + (index + 1)" @click="getVideoInfo(item)">{{ item.videoname }}
                </MenuItem>
            </div>
        </Submenu>
        <Submenu name="3">
            <template #title>
                <Icon type="ios-analytics"></Icon>
                电影
            </template>
            <div v-for="(item, index) in movie_videoInfo" v-bind:key="index">
                <MenuItem :name="'3-' + (index + 1)" @click="getVideoInfo(item)">{{ item.videoname }}
                </MenuItem>
            </div>
        </Submenu>
    </Menu>
</template>
<script>
import { Submenu, MenuItem, Icon } from 'view-ui-plus'
export default {
    components: {
        Submenu, MenuItem, Icon
    },
    props: {
        carton_videoInfo: Array,
        display_videoInfo: Array,
        movie_videoInfo: Array,
        getInfo: { type: Function }
    },
    methods: {
        getVideoInfo(item) {
            this.getInfo(item)
        }
    },
    mounted(){
        // this.getInfo(this.getVideoInfo.item)
    }
}
</script>
<style>

</style>