<template>
  <ul>
    <li v-for="item in items" v-bind:key="item.name">
      {{ item.name }}: {{ item.price }} x {{ item.quantity }} = {{ item.price * item.quantity }} 원
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'

export default {
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
