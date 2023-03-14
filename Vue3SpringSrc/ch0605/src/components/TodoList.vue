<template>
  <div>
    
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="index">
        {{ todo }}<button>삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TodoList',
  setup() {
    const todos = ref(['todo1', 'todo2', 'todo3'])

    return {
      todos,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
