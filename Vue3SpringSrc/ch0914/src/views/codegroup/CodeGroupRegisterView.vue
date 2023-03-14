<template>
  <div align="center">
    <h2>코드그룹 등록</h2>
    <code-group-register-form @add-post="addPost"/>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import CodeGroupRegisterForm from '../../components/codegroup/CodeGroupRegisterForm.vue'
import { router } from '../../router/router.js'

export default {
  name: 'CodeGroupRegisterView',
  components: { CodeGroupRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { groupCode, groupName } = payload
      client.post('/codegroups', { groupCode, groupName })
        .then(res => {
          alert('등록이 완료되었습니다.')
          router.push({
            name: 'CodeGroupReadView',
            params: { groupCode: res.data.groupCode }
          })
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            router.push({ name: 'Signin' })
          } else if (err.response.status === 403) {
            alert('접근 권한이 없습니다.')
            router.back()
          } else {
            alert(err.response.data.message)
          }
        })
    }

    return {
      addPost,
    }
  },
}
</script>
