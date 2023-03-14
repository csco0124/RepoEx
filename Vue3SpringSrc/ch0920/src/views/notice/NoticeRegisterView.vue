<template>
  <div align="center">
    <h2>공지사항 등록</h2>
    <notice-register-form @add-post="addPost"/>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import NoticeRegisterForm from '../../components/notice/NoticeRegisterForm.vue'
import { router } from '../../router/router.js'

export default {
  name: 'NoticeRegisterView',
  components: { NoticeRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { title, content } = payload
      client.post('/notices', { title, content })
        .then(res => {
          alert('등록이 완료되었습니다.')
          router.push({
            name: 'NoticeReadView',
            params: { noticeNo: res.data.noticeNo.toString() }
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
