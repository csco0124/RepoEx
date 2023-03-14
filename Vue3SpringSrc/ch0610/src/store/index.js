import { createStore } from 'vuex'

export const store = createStore({
  state: () => ({
    todos: [],
  }),
  mutations: {
    ADD_TODO (state, todo) {
      state.todos.push(todo)
    },
    REMOVE_TODO (state, index) {
      state.todos.splice(index, 1)
    },
    CLEAR_ALL (state) {
      state.todos.length = 0
    },
    RESTORE (state, { todos }) {
      state.todos = todos
    },
  },
  actions: {
    addTodo (context, todo) {
      context.commit("ADD_TODO", todo)
    },
    removeTodo (context, index) {
      context.commit("REMOVE_TODO", index)
    },
    clearAll (context) {
      context.commit("CLEAR_ALL")
    },
    save ({ state }) {
      const data = {
        todos: state.todos
      }
      localStorage.setItem('todo-app-data', JSON.stringify(data))
    },
    restore ({ commit }) {
      const data = localStorage.getItem('todo-app-data')
      if (data) {
        commit("RESTORE", JSON.parse(data))
      }
    },
  },
})
