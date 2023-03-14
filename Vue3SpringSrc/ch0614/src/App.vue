<template>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:add-todo="addTodo"></TodoInput>
    <TodoList v-bind:todos="todos" 
      v-bind:editingId="editingId" 
      v-on:remove-todo="removeTodo" 
      v-on:update-todo="editTodo"
      v-on:set-editing-id="setEditingId"
      v-on:reset-editing-id="resetEditingId"
      v-on:toggle-todo-status="toggleTodoStatus"></TodoList>
    <TodoFooter v-on:remove-all="clearAll"></TodoFooter>
</template>

<script>
import { computed } from 'vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
  setup() {
    const store = useStore()

    const todos = computed(() => store.state.todos)
    const editingId = computed(() => store.state.editingId)

    const clearAll = () => {
      store.dispatch('clearAll')
      store.dispatch('save')
    }

		const addTodo = (content) => {
      const id = new Date().getTime()
      
      const done = false
      const todo = { id, content, done }

      store.dispatch('addTodo', todo)
      store.dispatch('save')
		}

    const removeTodo = (id) => {
      store.dispatch('removeTodo', id)
      store.dispatch('save')
    }

    const editTodo = (content, id) => {
      store.dispatch('editTodo', { content, id })
      store.dispatch('save')
    }

    const setEditingId = (id) => {
      store.dispatch('setEditingId', id)
    }
    
    const resetEditingId = () => {
      store.dispatch('resetEditingId')
    }

    const toggleTodoStatus = (id) => {
      store.dispatch('toggleTodoStatus', id)
      store.dispatch('save')      
    }

    store.dispatch('restore')

    return {
      todos,
      editingId,
      clearAll,
      addTodo,
      removeTodo,
      editTodo,
      setEditingId,
      resetEditingId,
      toggleTodoStatus,
    }
  },
}
</script>

<style>
  body {
    text-align: center;
    background-color: #0000FF;
  }
</style>
