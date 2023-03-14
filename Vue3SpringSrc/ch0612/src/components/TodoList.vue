<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" v-bind:key="index">
        <span v-if="!isEditing(index)" v-on:dblclick="handleDblClick(index)">{{ todo.content }}</span>
        <input v-else type="text" ref="editInput" 
            v-bind:value="todo.content" 
            v-on:blur="handleBlur()" 
            v-on:keydown.enter="updateTodo(todo.id, $event)"/>
        <button v-on:click="removeTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'

export default {
  name: 'TodoList',
  props: ['todos', 'editingId'],
  emits: ['remove-todo', 'update-todo', 'set-editing-id', 'reset-editing-id'],
  setup(props, context) {
    const todos = props.todos
    
    const editInput = ref(null)

    const removeTodo = (index) => {
      context.emit('remove-todo', index)
    }

    const handleDblClick = (index) => {
      
      const { id } = todos[index]

      context.emit('set-editing-id', id)

      nextTick(() => {
        editInput.value.focus()  
      })
    }

    
    const handleBlur = () => {
      context.emit('reset-editing-id')
    }

    const updateTodo = (id, e) => {
      const content = e.target.value.trim()
      if (content.length <= 0) {
        return false;
      }
      
      context.emit('update-todo', content, id)

      editInput.value.blur()
    }

    const isEditing = (index) => {
      if(todos[index]) {
        return todos[index].id === props.editingId
      }
      
      return false
    }

    return {
      removeTodo,
      handleDblClick,
      handleBlur,
      updateTodo,
      editInput,
      isEditing,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
