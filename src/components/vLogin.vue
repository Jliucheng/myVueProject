<template>
    <div class="demo-login">
        <Login @on-submit="handleSubmit">
            <UserName name="username" />
            <Password name="password" />
            <div class="demo-auto-login">
                <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
                <a>忘记密码</a>
            </div>
            <Submit />
        </Login>
    </div>
</template>
<script>
import axios from 'axios'
import { Login, UserName, Password, Submit } from 'view-ui-plus'
export default {
    components: {
        Login, UserName, Password, Submit
    },
    data() {
        return {
            autoLogin: true,
            isIndex: false
        }
    },
    props: {
        isLoginSuccess: Boolean
    },
    methods: {
        handleSubmit(valid, { username, password }) {
            axios
                .get('http://43.139.189.22:5173/user/login', {
                    params: {
                        username: username,
                        passwd: password
                    }
                })
                .then((res) => {
                    //console.log(res.data.length)
                    if (valid && res.data) {
                        this.$parent.isLoginSuccess = false
                    } else {
                        this.$Modal.info({
                            title: '登录失败',
                            content: 'username or password is wrong.',
                        });
                    }
                })
        }
    }
}
</script>
<style>
.demo-login {
    width: 400px;
    margin: 15% auto !important;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
}

.demo-auto-login {
    margin-bottom: 24px;
    text-align: left;
}

.demo-auto-login a {
    float: right;
}
</style>
