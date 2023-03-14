<template>
  <div align="center">
    <h2>공지사항 목록</h2>
    <router-link v-if="isAdmin" :to="{ name: 'NoticeRegisterView' }">새로만들기</router-link>
    <notice-list :notices="notices"/>
  </div>
</template>

<script>
import NoticeList from '../../components/notice/NoticeList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'NoticeListView',
  components: { NoticeList },
  setup() {
    const isAdmin = inject("isAdmin")
    const notices = inject("notices")
    const fetchNoticeList = inject("fetchNoticeList")

    onMounted (() => {
      fetchNoticeList()
    })

    return {
      isAdmin,
      notices,
    }
  },
}
</script>
