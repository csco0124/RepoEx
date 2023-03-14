<template>
  <div align="center">
    <h2>공개자료실 상세보기</h2>
    <pds-read v-if="pdsItem && attachments"
        :pdsItem="pdsItem"
        :attachments="attachments"/>
    <p v-else>loading...</p>
    <template v-if="isAdmin">
      <router-link :to="{ name: 'PdsModifyView', params: { itemId } }">편집</router-link>
      <button @click="deletePost">삭제</button>
    </template>
    <router-link :to="{ name: 'PdsListView' }">목록</router-link>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import PdsRead from '../../components/pds/PdsRead.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'PdsReadView',
  components: { PdsRead },
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isAdmin = inject("isAdmin")

    const pdsItem = inject("pdsItem")
    const attachments = inject("attachments")
    const fetchPds = inject("fetchPds")

    fetchPds(props.itemId)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const deletePost = () => {
      const { itemId } = pdsItem.value
      client.delete(`/pds/${itemId}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'PdsListView'})
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
      pdsItem,
      attachments,
      deletePost,
    }
  },
}
</script>
