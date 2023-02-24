<template>
    <div class="layout">
        <Layout>
            <vHeader />
            <Layout>
                <Sider hide-trigger :style="{ background: '#fff' }">
                    <vMenu :carton_videoInfo="carton_videoInfo" :display_videoInfo="display_videoInfo"
                        :movie_videoInfo="movie_videoInfo" :getInfo="getInfo" />
                </Sider>
                <Layout :style="{ padding: '0 24px 24px' }">
                    <vContent :InfoByVideoName="InfoByVideoName" :videoInfo="videoInfo" :loading="loading"
                        :viewData="viewData" />
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import axios from 'axios';
import { Layout, Sider } from 'view-ui-plus'
import vHeader from './vHeader.vue'
import vContent from './vContent.vue'
import vMenu from './vMenu.vue'
export default {
    components: {
        Layout, Sider, vContent, vMenu, vHeader
    },
    data() {
        return {
            loading: true,
            carton_videoInfo: [],
            display_videoInfo: [],
            movie_videoInfo: [],
            videoname: '',
            videoInfo: {},
            InfoByVideoName: [],
            viewData: [],
            timer: null
        }
    },
    methods: {
        getInfo(item) {
            this.videoInfo = item
            this.getInfoByVideoName(item.videoname)
        },
        getInfoByVideoName(videoName) {
            axios
                .get('http://43.139.189.22:5173/data/searchName', {
                    params: {
                        videoname: videoName
                    }
                })
                .then((res) => {
                    this.InfoByVideoName = res.data
                    this.loading = false
                })
                .catch((err) => {
                    this.$Modal.info({
                        title: '获取数据失败',
                        content: err,
                    });
                })
        },
        loadData() {
            axios
                .get("http://43.139.189.22:5173/data/loadView")
                .then((res) => {
                    //console.log(res.data);
                    // this.viewData = res.data;
                    // this.loading = false
                    for (var i = 0; i < res.data.length; i++) {
                        switch (res.data[i].videotype) {
                            case '电影':
                                this.movie_videoInfo.push(res.data[i])
                                //console.log(res.data[i].videoname)
                                break
                            case '动漫':
                                this.carton_videoInfo.push(res.data[i])
                                //console.log(res.data[i].videoname)
                                break
                            case '电视剧':
                                this.display_videoInfo.push(res.data[i])
                                //console.log(res.data[i].videoname)
                                break
                            default:
                                console.log(res.data[i].videoname)
                                break
                        }
                    }
                })
                .catch((err) => {
                    this.$Modal.info({
                        title: '获取数据失败',
                        content: err,
                    });
                });
        },
        loadViewData() {
            axios
                .get("http://43.139.189.22:5173/data/loadView")
                .then((res) => {
                    //console.log(res.data);
                    this.viewData = res.data;
                    this.loading = false
                })
                .catch((err) => {
                    this.$Modal.info({
                        title: '获取数据失败',
                        content: err,
                    });
                });
        }
    },
    mounted() {
        // this.getInfo(this.videoInfo)
        let that = this
        if (this.timer == null) {
            this.timer = setTimeout(() => {
                that.loadViewData()
            }, 1000);
        }else{
            this.timer = setInterval(()=>{
                that.loadViewData()
            }, 60000)
        }
        // that.loadViewData()
        that.loadData()
    },
    beforeUnmount(){
        clearInterval(this.timer)
    }

}
</script>
<style>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>