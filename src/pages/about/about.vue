<template>
    <div>
        用户名:
        <input type="text" v-model="form.idCardNumber">
        <br>
        新密码:
        <input type="text" v-model="form.newPassword">
        <br>
        新密码:
        <input type="text" v-model="form.rePassword">
        <br>
    </div>
    <button @click="update">确认修改</button>
    <button @click="getUser">查询</button>
    <div>
        用户信息:
        <br>
        昵称:{{ userInfo.nickname }}
        <br>
        性别:{{ userInfo.gender }}
        <br>
        年龄:{{ userInfo.age }}
    </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { useRouter } from "vue-router"
import { updatePassword, getUserInfo } from '../../api/user'


const router = useRouter()
const form = reactive({
    idCardNumber: '',
    newPassword: '',
    rePassword: '',
})
const userInfo = reactive({
    nickname: '',
    gender: '',
    age: '',
})
const update = () => {
    if (form.newPassword !== form.rePassword) return //判断新旧代码是否相同
    updatePassword(form) //调用后端修改密码服务
        .then((res: any) => {  //返回修改结果
            alert(res.data.msg) //页面提示
            router.push('/home') //跳转到登录页面
            alert('修改密码后请重新登录')
        })
        .catch((err: any) => { //捕获错误
            alert(err.response.data.msg)
        })
}

const getUser = () => {
    getUserInfo(form.username)
        .then((res: any) => {
            for (const key in userInfo) {
                userInfo[key] = res.data.data[0][key]
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

</script>
