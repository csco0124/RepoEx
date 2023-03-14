<template>
  <div>
    <ul>
      <TodoItem v-for="todo in todos"
            v-bind:key="todo.id"
            v-bind:todo="todo"
            v-bind:editingId="editingId"
            v-on:remove-todo="handleRemoveTodo" 
            v-on:update-todo="handleUpdateTodo"
            v-on:set-editing-id="handleSetEditingId"
            v-on:reset-editing-id="handleResetEditingId"
            v-on:toggle-todo-status="handleToggleTodoStatus" />
    </ul>  
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import { inject } from 'vue'

export default {
  name: 'TodoList',
	  
  emits: ['remove-todo', 'update-todo', 'set-editing-id', 'reset-editing-id', 'toggle-todo-status'],
  setup(props, context) {
    const todos = inject("filteredTodos")
    const editingId = inject("editingId")

    const handleRemoveTodo = (id) => {
      context.emit('remove-todo', id)
    }
    const handleUpdateTodo = (content, id) => {
      context.emit('update-todo', content, id)
    }
    
    const handleSetEditingId = (id) => {
      context.emit('set-editing-id', id)
    }
    
    const handleResetEditingId = () => {
      context.emit('reset-editing-id')
    }

    const handleToggleTodoStatus = (id) => {
      context.emit('toggle-todo-status', id);
    }

    return {
      todos,
      editingId,
      handleRemoveTodo,
      handleUpdateTodo,
      handleSetEditingId,
      handleResetEditingId,
      handleToggleTodoStatus,
    }
  },
  components: {
    TodoItem,
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
