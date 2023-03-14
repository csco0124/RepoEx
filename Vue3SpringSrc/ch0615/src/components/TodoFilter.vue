<template>
  <div>
    <input type="radio" v-bind:checked="filter === null" v-on:change="setFilter(null)">전체
    <input type="radio" v-bind:checked="filter === 'A'" v-on:change="setFilter('A')">미완료
    <input type="radio" v-bind:checked="filter === 'B'" v-on:change="setFilter('B')">완료
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'TodoFilter',
  setup() {
    const store = useStore()

    const filter = computed(() => store.state.filter)

    const setFilter = (filter) => {
      store.dispatch('setFilter', filter)
    }

    return {
      filter,
      setFilter,
    }
  },
}
</script>

<style scoped>
  div {
    background-color: #00FFFF;
  }
</style>
