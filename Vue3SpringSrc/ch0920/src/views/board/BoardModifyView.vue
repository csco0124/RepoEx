<template>
  <div align="center">
    <h2>회원게시판 수정</h2>
    <board-modify-form v-if="board"
        :board="board"
        @modify-post="modifyPost" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import BoardModifyForm from '../../components/board/BoardModifyForm.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'BoardModifyView',
  components: { BoardModifyForm },
  props: {
    boardNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const board = inject("board")
    const fetchBoard = inject("fetchBoard")

    fetchBoard(props.boardNo)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const modifyPost = (payload) => {
      const { title, content, writer } = payload
      client.put(`/boards/${props.boardNo}`, { title, content, writer })
        .then(res => {
          alert('수정이 완료되었습니다.')
          router.push({
            name: 'BoardReadView',
            params: { boardNo: res.data.boardNo.toString() }
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
      board,
      modifyPost,
    }
  },
}
</script>
