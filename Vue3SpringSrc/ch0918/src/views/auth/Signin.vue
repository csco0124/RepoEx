<template>
  <div align="center">
    <h2>로그인</h2>
    <signin-form @sign-in="login"/>
    <p><router-link :to="{ name: 'Signup' }">회원가입</router-link></p>
  </div>
</template>

<script>
import SigninForm from '../../components/auth/SigninForm.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'Signin',
  components: { SigninForm },
  setup() {
    const signin = inject("signin")

    const login = (payload) => {
      signin(payload).then(res => {
        alert('로그인 되었습니다.')
        router.push({ name: 'Home' })
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      login,
    }
  },
}
</script>
