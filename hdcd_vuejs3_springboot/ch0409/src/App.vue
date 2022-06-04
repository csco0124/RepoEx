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

    /*
    const todos = ref([])
    */
    const todos = computed(() => store.state.todos)

    const clearAll = () => {
      /*      
      todos.value.length = 0
      */
      store.dispatch('clearAll')
    }

		const addTodo = (todo) => {
      /*      
			todos.value.push(todo)
      */
      store.dispatch('addTodo', todo)
		}

    const removeTodo = (index) => {
      /*      
      todos.value.splice(index, 1)
      */
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
