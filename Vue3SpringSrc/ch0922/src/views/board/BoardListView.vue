<template>
  <div align="center">
    <h2>회원게시판 목록</h2>
    <router-link v-if="isMember" :to="{ name: 'BoardRegisterView' }">새로만들기</router-link>
    <board-list :boards="boards"/>
  </div>
</template>

<script>
import BoardList from '../../components/board/BoardList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'BoardListView',
  components: { BoardList },
  setup() {
    const isMember = inject("isMember")
    const boards = inject("boards")
    const fetchBoardList = inject("fetchBoardList")

    onMounted (() => {
      fetchBoardList()
    })

    return {
      isMember,
      boards,
    }
  },
}
</script>
