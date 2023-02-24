<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <!-- <div class="layout-logo">
                </div> -->
            <div class="layout-nav">
                <MenuItem name="1">
                <Icon type="ios-navigate"></Icon>
                添加
                </MenuItem>
                <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                刷新
                </MenuItem>
                <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                退出
                </MenuItem>
                <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                退出
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>
<script>
import { MenuItem, Header, Menu, Icon } from 'view-ui-plus'
// import vLoadData from './vLoadData.vue';
export default {
    components: {
        Header, MenuItem, Icon, Menu
    },
    data() {
        return {
            newDate: new Date()
        }
    }
}
</script>
<style>
.layout-logo {
    width: 500px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: center;
    /* position: relative; */
    top: 15px;
    left: 20px;
}

.layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>