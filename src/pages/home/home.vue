<template>
    <div>
        账 号:
        <input type="text" v-model="form.idCardNumber">
        <br>
        密 码:
        <input type="text" v-model="form.password">
    </div>
    <button @click="login">登录</button>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { useRouter } from "vue-router"
import { userLogin } from '../../api/user.ts'


const router = useRouter()
const form = reactive({
    idCardNumber: '',
    password: ''
})

function login(){
    userLogin(form)
        .then((res: any) => {
            alert(res.data.msg)
            router.push('/about')
        })
        .catch((err) => {
            alert(err.response.data.msg)
        })
}


</script>

<style scoped></style>
