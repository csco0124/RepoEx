<template>
  <h1>{{ message }}</h1>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const message = ref("Hello Vue!")

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
      message,
      items,
    }
  },
}
</script>
