<template>
  <div align="center">
    <h2>상품 목록</h2>
    <router-link :to="{ name: 'ItemRegisterView' }">새로만들기</router-link>
    <item-list/>
  </div>
</template>

<script>
import ItemList from '../components/ItemList.vue'

export default {
  name: 'ItemListView',
  components: { ItemList }
}
</script>
