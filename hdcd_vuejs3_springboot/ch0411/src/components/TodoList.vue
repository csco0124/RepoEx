<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="index">
        <!--
        {{ todo }}
        -->
        <span v-if="!todo.isEditing" v-on:dblclick="handleDblClick(index)">{{ todo.content }}</span>
        <input v-else type="text" ref="editInput" 
            v-bind:value="todo.content" 
            v-on:blur="handleBlur(index)" 
            v-on:keydown.enter="updateTodo(index, $event)"/>
        <button v-on:click="removeTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'

export default {
  name: 'TodoList',
  props: ['todos'],
  emits: ['remove-todo', 'update-todo'],
  setup(props, context) {
    const todos = props.todos
    
    const editInput = ref(null)

    const removeTodo = (index) => {
      context.emit('remove-todo', index)
    }

    const handleDblClick = (index) => {
      todos[index].isEditing = true

      nextTick(() => {
        editInput.value.focus()
      })
    }

    const handleBlur = (index) => {
      todos[index].isEditing = false;
    }

    const updateTodo = (index, e) => {
      const content = e.target.value.trim()
      if (content.length <= 0) {
        return false;
      }
      
      context.emit('update-todo', content, index)

      editInput.value.blur()
    }

    return {
      removeTodo,
      handleDblClick,
      handleBlur,
      updateTodo,
      editInput,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
