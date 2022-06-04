<template>
  <div align="center">
    <h2>상품 상세보기</h2>
    <item-read v-if="item" :item="item"/>
    <p v-else>loading...</p>
    <router-link v-if="isAdmin" :to="{ name: 'ItemModifyPage', params: { itemId } }">편집</router-link>
    <button v-if="isAdmin" @click="deletePost">삭제</button>
    <button v-if="isMember" @click="buyItem">구매</button>
    <router-link :to="{ name: 'ItemListPage' }">목록</router-link>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import ItemRead from '/@components/item/ItemRead.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'ItemReadPage',
  components: { ItemRead },
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isAdmin = inject("isAdmin")
    const isMember = inject("isMember")

    const item = inject("item")
    const fetchItem = inject("fetchItem")

    fetchItem(props.itemId)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const deletePost = () => {
      const { itemId } = item.value
      client.delete(`/items/${itemId}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'ItemListPage'})
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

    const buyItem = () => {
      const { itemId } = item.value
      client.get(`/items/buy/${itemId}`)
        .then(res => {
          alert(res.data)
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
      isAdmin,
      isMember,
      item,
      deletePost,
      buyItem,
    }
  },
}
</script>
