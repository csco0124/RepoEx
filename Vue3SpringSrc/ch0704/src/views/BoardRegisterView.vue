<template>
  <div align="center">
    <h2>게시판 등록</h2>
    <board-register-form/>
  </div>
</template>

<script>
import BoardRegisterForm from '../components/BoardRegisterForm.vue'

export default {
  name: 'BoardRegisterView',
  components: { BoardRegisterForm }
}
</script>
