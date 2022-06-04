<template>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:add-todo="handleAddTodo"></TodoInput>
    <TodoFilter v-bind:filter="filter"
        v-on:set-filter="handleSetFilter" ></TodoFilter>
    <TodoList v-bind:todos="filteredTodos" 
        v-bind:editingId="editingId"
        v-on:remove-todo="handleRemoveTodo" 
        v-on:update-todo="handleEditTodo"
        v-on:set-editing-id="handleSetEditingId"
        v-on:reset-editing-id="handleResetEditingId"
        v-on:toggle-todo-status="handleToggleTodoStatus"></TodoList>
    <TodoFooter v-on:remove-all="handleClearAll"></TodoFooter>  
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
/*
import { useStore } from 'vuex'
*/
import { useTodos } from './compositions/useTodos.js'
import TodoFilter from './components/TodoFilter.vue'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
    TodoFilter,
  },
  setup() {
    /*    
    const store = useStore()
    */

    const {
      todos,
      filteredTodos,
      editingId,
      filter,
      clearAll, 
      addTodo, 
      removeTodo, 
      editTodo, 
      setEditingId, 
      resetEditingId, 
      toggleTodoStatus, 
      save, 
      restore,
      setFilter,
    } = useTodos()

    const handleClearAll = () => {
      /*
      store.dispatch('clearAll')
      store.dispatch('save')
      */
      clearAll()
      save()
    }

		const handleAddTodo = (content) => {
      const todo = { content }

      /*
      store.dispatch('addTodo', todo)
      store.dispatch('save')
      */
      addTodo(todo)
      save()
		}

    const handleRemoveTodo = (id) => {
      /*      
      store.dispatch('removeTodo', id)
      store.dispatch('save')
      */
      removeTodo(id)
      save()
    }

    const handleEditTodo = (content, id) => {
      /*      
      store.dispatch('editTodo', { content, id })
      store.dispatch('save')
      */
      editTodo({ id, content })
      save()
    }

    const handleSetEditingId = (id) => {
      /*      
      store.dispatch('setEditingId', id)
      */
      setEditingId(id)
    }
    
    const handleResetEditingId = () => {
      /*      
      store.dispatch('resetEditingId')
      */
      resetEditingId()
    }

    const handleToggleTodoStatus = (id) => {
      /*      
      store.dispatch('toggleTodoStatus', id)
      store.dispatch('save')
      */
      toggleTodoStatus(id)
      save()
    }

    const handleSetFilter = (filter) => {
      setFilter(filter)
    }

    /*
    store.dispatch('restore')
    */
    restore()

    return {
      todos,
      filteredTodos,
      editingId,
      filter,
      handleClearAll,
      handleAddTodo,
      handleRemoveTodo,
      handleEditTodo,
      handleSetEditingId,
      handleResetEditingId,
      handleToggleTodoStatus,
      handleSetFilter,
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
