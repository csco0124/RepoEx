<template>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:add-todo="addTodo"></TodoInput>
    <TodoList v-bind:todos="todos"
      v-on:remove-todo="removeTodo"
      v-on:update-todo="editTodo"></TodoList>
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

    const clearAll = () => {
      store.dispatch('clearAll')
      store.dispatch('save')
    }

		const addTodo = (content) => {
      const isEditing = false
      const todo = { isEditing, content }

      store.dispatch('addTodo', todo)
      store.dispatch('save')
		}

    const removeTodo = (index) => {
      store.dispatch('removeTodo', index)
      store.dispatch('save')
    }

    const editTodo = (content, index) => {
      store.dispatch('editTodo', { content, index })
      store.dispatch('save')
    }

    store.dispatch('restore')

    return {
      todos,
      clearAll,
      addTodo,
      removeTodo,
      editTodo,
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
