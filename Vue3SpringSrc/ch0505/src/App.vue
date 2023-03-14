<template>
  <h1>{{ message }}</h1>
</template>

<script>
export default {
  setup() {
    const message = "Hello Vue!"

    return {
      message,
    }
  },
}
</script>
