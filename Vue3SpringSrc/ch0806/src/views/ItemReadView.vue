<template>
  <div align="center">
    <h2>상품 상세보기</h2>
    <item-read v-if="item" :item="item"/>
    <p v-else>loading...</p>
    <router-link :to="{ name: 'ItemModifyView', params: { itemId } }">편집</router-link>
    <button>삭제</button>
    <router-link :to="{ name: 'ItemListView' }">목록</router-link>
  </div>
</template>

<script>
import ItemRead from '../components/ItemRead.vue'
import client from '../modules/client.js'
import { ref } from 'vue'

export default {
  name: 'ItemReadView',
  components: { ItemRead },
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const item = ref({})

    client.get(`/items/${props.itemId}`)
      .then(res => {
        item.value = res.data
      })
      .catch(err => {
        alert(err.response.data.msg)
      })

    return {
      item,
    }
  },
}
</script>
