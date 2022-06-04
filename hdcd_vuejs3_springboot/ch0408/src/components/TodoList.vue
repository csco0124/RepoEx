<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="index">
        {{ todo }}
        <button v-on:click="removeTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'TodoList',
  props: ['todos'],
  emits: ['remove-todo'],
  setup(props, context) {

    const removeTodo = (index) => {
      context.emit('remove-todo', index)
    }

    return {
      removeTodo,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
