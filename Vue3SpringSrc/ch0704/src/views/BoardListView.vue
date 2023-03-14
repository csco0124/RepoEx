<template>
  <div align="center">
    <h2>게시판 목록</h2>
    <router-link :to="{ name: 'BoardRegisterView' }">새로만들기</router-link>
    <board-list/>
  </div>
</template>

<script>
import BoardList from '../components/BoardList.vue'

export default {
  name: 'BoardListView',
  components: { BoardList }
}
</script>
