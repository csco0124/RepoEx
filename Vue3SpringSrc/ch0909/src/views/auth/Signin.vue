<template>
  <div align="center">
    <h2>로그인</h2>
    <signin-form @sign-in="login"/>
  </div>
</template>

<script>
import SigninForm from '../../components/auth/SigninForm.vue'
import { useAuth } from '../../compositions/useAuth.js'
import { router } from '../../router/router.js'

export default {
  name: 'Signin',
  components: { SigninForm },
  setup() {
    const {
      signin,
    } = useAuth()

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
