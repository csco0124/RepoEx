<template>
  <ul>
    <li v-for="item in items" v-bind:key="item.name">
        {{ item.name }}의 가격: <input type="text" v-on:input="item.price = $event.target.value" v-bind:value="item.price">
    </li>
  </ul>
  <hr>
  <item-list v-bind:items="items"></item-list>
</template>

<script>
import { ref } from 'vue'
import ItemList from './components/ItemList.vue'

export default {
  components: {
    ItemList,
  },
  setup() {
    const items = ref([
      {
        name: 'CPU', price: 462984, quantity: 1
      }, 
      {
        name: '메인보드', price: 112053, quantity: 1
      }, 
      {
        name: '메모리', price: 79608, quantity: 2
      }
    ])

    return {
      items,
    }
  },
}
</script>
