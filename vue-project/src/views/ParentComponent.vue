<template>
  <ChildComponent />
</template>

<script>
import { provide } from 'vue';  //provide 추가
import ChildComponent from './ChildComponent';

export default {
  components: {
    ChildComponent
  },
  setup() {
    provide('title', 'Vue.js 프로젝트');  //provide 함수를 통해서 전달 할 키(key), 값(value) 설정
  }
}
</script>