<template>
  <div align="center">
    <h2>코드 등록</h2>
    <code-detail-register-form @add-post="addPost" :codeGroups="codeGroups"/>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import CodeDetailRegisterForm from '/@components/codedetail/CodeDetailRegisterForm.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'CodeDetailRegisterPage',
  components: { CodeDetailRegisterForm },
  setup() {
    const codeGroups = inject("codeGroups")
    const fetchCodeGroupList = inject("fetchCodeGroupList")

    fetchCodeGroupList()
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const addPost = (payload) => {
      const { groupCode, codeValue, codeName } = payload

      client.post('/codedetails', { groupCode, codeValue, codeName })
        .then(res => {
          alert('등록이 완료되었습니다.')
          router.push({
            name: 'CodeDetailReadPage',
            params: { groupCode: res.data.groupCode, codeValue: res.data.codeValue}
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
      codeGroups,
      addPost,
    }
  },
}
</script>
