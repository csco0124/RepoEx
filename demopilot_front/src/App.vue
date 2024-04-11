<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink> | 
				<RouterLink to="/test1">Test1</RouterLink> | 
				<RouterLink to="/test2">Test2</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>

</style>
