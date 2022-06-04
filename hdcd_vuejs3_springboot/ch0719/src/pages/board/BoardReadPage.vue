<template>
  <div align="center">
    <h2>회원게시판 상세보기</h2>
    <board-read v-if="board" :board="board"/>
    <p v-else>loading...</p>
    <template v-if="isAuthorized && board && (myinfo.userId === board.writer)">
      <router-link :to="{ name: 'BoardModifyPage', params: { boardNo } }">편집</router-link>
      <button @click="deletePost">삭제</button>
    </template>
    <template v-if="isAdmin">
      <button @click="deletePost">삭제</button>
    </template>
    <router-link :to="{ name: 'BoardListPage' }">목록</router-link>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import BoardRead from '/@components/board/BoardRead.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'BoardReadPage',
  components: { BoardRead },
  props: {
    boardNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isAuthorized = inject("isAuthorized")
    const isAdmin = inject("isAdmin")
    const myinfo = inject("myinfo")

    const board = inject("board")
    const fetchBoard = inject("fetchBoard")

    fetchBoard(props.boardNo)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const deletePost = () => {
      const { boardNo, writer } = board.value
      client.delete(`/boards/${boardNo}?writer=${writer}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'BoardListPage'})
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
      isAuthorized,
      isAdmin,
      myinfo,
      board,
      deletePost,
    }
  },
}
</script>
