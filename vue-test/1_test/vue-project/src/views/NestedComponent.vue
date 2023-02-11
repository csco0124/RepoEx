<template>
  <div>
    <PageTitle v-bind:title="title" />
  </div>
</template>
<script>
import PageTitle from '../components/PageTitle';
export default {
  components: { PageTitle },
  data() {
    return {
      title: "121212"
    }
  }
}
</script>