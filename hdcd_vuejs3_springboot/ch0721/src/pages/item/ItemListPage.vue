<template>
  <div align="center">
    <h2>상품 목록</h2>
    <template v-if="isAdmin">
      <router-link :to="{ name: 'ItemRegisterPage' }">새로만들기</router-link>
    </template>
    <item-list :items="items"/>
  </div>
</template>

<script>
import ItemList from '/@components/item/ItemList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'ItemListPage',
  components: { ItemList },
  setup() {
    const isAdmin = inject("isAdmin")
    const items = inject("items")
    const fetchItemList = inject("fetchItemList")

    onMounted (() => {
      fetchItemList()
    })

    return {
      isAdmin,
      items,
    }
  },
}
</script>
