<template>
  <div align="center">
    <h2>구매상품 상세보기</h2>
    <user-item-read v-if="userItem" :userItem="userItem"/>
    <p v-else>loading...</p>
    <router-link :to="{ name: 'UserItemListView' }">목록</router-link>
  </div>
</template>

<script>
import UserItemRead from '../../components/useritem/UserItemRead.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'UserItemReadView',
  components: { UserItemRead },
  props: {
    userItemNo: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const userItem = inject("userItem")
    const fetchUserItem = inject("fetchUserItem")

    fetchUserItem(props.userItemNo)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    return {
      userItem,
    }
  },
}
</script>
