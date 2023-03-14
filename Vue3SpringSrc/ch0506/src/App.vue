<template>
  <h1>{{ message }}</h1>
</template>

<script>
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    const message = "Hello Vue!"

    onBeforeMount(() => {
      console.log("beforeMount");
    })

    onMounted(() => {
      console.log("mounted");
    })

    onBeforeUpdate(() => {
      console.log("beforeUpdate");
    })

    onUpdated(() => {
      console.log("updated");
    })

    return {
      message,
    }
  },
}
</script>
