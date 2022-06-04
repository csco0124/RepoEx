<template>
  <item-main v-bind:items="items"></item-main>
</template>

<script>
import { ref } from 'vue'
import ItemMain from './components/ItemMain.vue'

export default {
  name: 'App',
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
  components: {
    ItemMain,
  }
}
</script>
