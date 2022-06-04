<template>
  <div align="center">
    <h2>게시판 상세보기</h2>
    <board-read v-if="board" :board="board"/>
    <p v-else>loading...</p>
    <router-link :to="{ name: 'BoardModifyPage', params: { boardNo } }">편집</router-link>
    <button>삭제</button>
    <router-link :to="{ name: 'BoardListPage' }">목록</router-link>
  </div>
</template>

<script>
import BoardRead from '../components/BoardRead.vue'
import client from '../modules/client.js'
import { ref } from 'vue'

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
    const board = ref({})

    client.get(`/boards/${props.boardNo}`)
      .then(res => {
        board.value = res.data
      })
      .catch(err => {
        alert(err.response.data.message)
      })

    return {
      board,
    }
  },
}
</script>
