<template>
  <div>
    <ul>
       
      <TodoItem v-for="todo in todos"
            v-bind:key="todo.id"
            v-bind:todo="todo"
            v-bind:editingId="editingId"
            v-on:remove-todo="fireRemoveTodo" 
            v-on:update-todo="fireUpdateTodo"
            v-on:set-editing-id="fireSetEditingId"
            v-on:reset-editing-id="fireResetEditingId" />
    </ul>
  </div>
</template>

<script>
  
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  props: ['todos', 'editingId'],
  emits: ['remove-todo', 'update-todo', 'set-editing-id', 'reset-editing-id'],
  setup(props, context) {
        
        

    
    const fireRemoveTodo = (id) => {
      context.emit('remove-todo', id)
    }

    
    const fireSetEditingId = (id) => {
      context.emit('set-editing-id', id)
    }

    
    const fireResetEditingId = () => {
      context.emit('reset-editing-id')
    }

    
    const fireUpdateTodo = (content, id) => {
      context.emit('update-todo', content, id)
    }

    

    return {
      
      fireRemoveTodo,
      fireUpdateTodo,
      fireSetEditingId,
      fireResetEditingId,
    }
  }
}
</script>

<style scoped>
  div {
    background-color: #FFFF00;
  }
</style>
