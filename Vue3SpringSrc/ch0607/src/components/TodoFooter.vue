<template>
  <div>
    <button v-on:click="clearTodo">모두 삭제</button>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
  emits: ['remove-all'],
  setup(props, context) {
    const clearTodo = () => {
      
      context.emit('remove-all')
    }

    return {
      clearTodo,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #00FFFF;
  }
</style>
