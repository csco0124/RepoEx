<template>
  <div>
    <input type="radio" v-bind:checked="filter === null" v-on:change="setFilter(null)">전체
    <input type="radio" v-bind:checked="filter === 'A'" v-on:change="setFilter('A')">미완료
    <input type="radio" v-bind:checked="filter === 'B'" v-on:change="setFilter('B')">완료
  </div>
</template>

<script>


export default {
  name: 'TodoFilter',
  props: ['filter'],
  emits: ['set-filter'],
  setup(props, context) {
    

    

    const setFilter = (filter) => {
      context.emit('set-filter', filter)
    }

    return {
            
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
