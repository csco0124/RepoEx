<template>
  <item-main></item-main>
</template>

<script>
import { ref, provide } from 'vue'
import ItemMain from './components/ItemMain.vue'

export default {
  name: 'App',
  components: {
    ItemMain,
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

    provide('items', items)
  },
}
</script>
