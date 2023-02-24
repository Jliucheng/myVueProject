<template>
    <Content :style="{ padding: '24px', minHeight: '280px', background: '#fff' }">
        <div v-if="isShowTab(videoInfo)">
            <h2><a :href="'https://okjx.cc/?url=' + videoInfo.videourl" target="_blank">{{
                videoInfo.videoname
            }}</a></h2>
            更新第 {{ videoInfo.update_episode }} 集
            更新时间：{{ videoInfo.checkUpTime }}
            时长：{{ Math.trunc(videoInfo.duration / 60) }} 分钟
            <Table height="500" :loading="loading" :columns="columns" :data="InfoByVideoName">
                <template #name="{ row }">
                    <strong>{{ row.videoname }}</strong>
                </template>
                <template #durations="{ row }">
                    {{ Math.trunc(row.duration/60) }}
                </template>
                <template #action="{ index }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                </template>

            </Table>
            <!-- <Page :total="InfoByVideoName.length" :key="currentPage" @on-page-size-change="getCurrentPage(key)" show-elevator /> -->
        </div>
        <div v-else>
            <Table height="550" :border=true :loading="loading" :columns="columnViewData" :data="viewData">
                <template #action="{ index }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="showViewData(index)">View</Button>
                </template>
                <template #name="{ row }">
                    <strong>{{ row.videoname }}</strong>
                </template>
                <template #durations="{ row }">
                    {{ Math.trunc(row.duration/60) }}
                </template>
                <template #checkUpTimes="{ row }">
                    {{ new Date(row.checkUpTime).toDateString() }}
                </template>
            </Table>
        </div>
    </Content>
</template>
<script>
import axios from 'axios'
import { Content, Table, Button } from 'view-ui-plus'
export default {
    components: {
        Content, Table, Button
    },
    props: {
        InfoByVideoName: Array,
        viewData: Array,
        videoInfo: {},
        loading: Boolean
    },
    data() {
        return {
            columns: [
                {
                    title: '动漫名',
                    slot: 'name'
                },

                {
                    title: '集数',
                    key: 'episode'
                },
                {
                    title: '时长(分钟)',
                    slot: 'durations',
                },
                {
                    title: '更新时间',
                    key: 'checkUpTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            columnViewData: [
                {
                    title: '动漫名',
                    slot: 'name'
                },
                {
                    title: '视频类型',
                    key: 'videotype'
                },
                {
                    title: '更新集数',
                    key: 'update_episode'
                },
                {
                    title: '时长(分钟)',
                    slot: 'durations',
                },
                {
                    title: '更新时间',
                    slot: 'checkUpTimes',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            newDate: new Date(),
            minute: new Date(),
            second: new Date(),
            hour: new Date()
        }
    },
    methods: {
        isShowTab(videoInfo){
            if(videoInfo.videoname){
                return true
            }else{
                return false
            }
        },
        getInfo(m) {
            if (this.viewData.length <= m) {
                return false
            }
            else {
                return {
                    videoname: this.viewData[m].videoname,
                    dataid: this.viewData[m].dataid,
                    update: this.viewData[m].update_episode,
                    videotype: this.viewData[m].videotype
                }
            }
        },
        flush() {
            if (this.getInfo(this.minute) && this.second == 0) {
                axios.get('http://43.139.189.22:5173/name/refresh', {
                    params: this.getInfo(this.minute)
                })
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        alert(err)
                    })
                axios.get('http://43.139.189.22:5173/data/loadData', {
                    params: this.getInfo(this.minute)
                })
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        alert(err)
                    })
                return true
            } else {
                return false
            }
        },
        show(index) {
            setTimeout(() => {
                this.$Modal({
                    title: `即将观看${this.InfoByVideoName[index].videoname} 的第${this.InfoByVideoName[index].episode}集`,
                    content: window.open('https://okjx.cc/?url=' + this.InfoByVideoName[index].videourl),
                })
            }, 100);

        },
        showViewData(index) {
            setTimeout(() => {
                this.$Modal({
                    title: `即将观看${this.viewData[index].videoname} 的第${this.viewData[index].update_episode}集`,
                    content: window.open('https://okjx.cc/?url=' + this.viewData[index].videourl),
                })
            }, 100);

        },
    },
    // 挂载时间
    mounted() {
        let that = this
        this.timer = setInterval(function () {
            that.newDate = new Date().toLocaleString()
            that.minute = new Date().getMinutes()
            that.second = new Date().getSeconds()
            that.hour = new Date().getHours()
            that.flush()
        }, 1000)
    },
    // 销毁时清除计时器
    beforeUnmount: function () {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
}
</script>