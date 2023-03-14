<template>
  <div align="center">
    <h2>게시판 등록</h2>
    <board-register-form @add-post="addPost"/>
  </div>
</template>

<script>
import BoardRegisterForm from '../components/BoardRegisterForm.vue'
import client from '../modules/client.js'
import { router } from '../router/router.js'

export default {
  name: 'BoardRegisterView',
  components: { BoardRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { title, writer, content } = payload;

      client.post('/boards', { title, content, writer })
        .then(res => {
          console.log(res)
          alert('등록되었습니다.')
          router.push({
            name: 'BoardReadView',
            params: { boardNo: res.data.boardNo }
          })
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }

    return {
      addPost,
    }
  },
}
</script>
