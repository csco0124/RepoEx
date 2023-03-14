<template>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:add-todo="addTodo"></TodoInput>
    <TodoList v-bind:todos="todos" v-on:remove-todo="removeTodo"></TodoList>
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
    }

		const addTodo = (todo) => {
            
      store.dispatch('addTodo', todo)
		}

    const removeTodo = (index) => {
            
      store.dispatch('removeTodo', index)
    }

    return {
      todos,
      clearAll,
      addTodo,
      removeTodo,
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
