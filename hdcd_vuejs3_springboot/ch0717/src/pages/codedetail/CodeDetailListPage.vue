<template>
  <div align="center">
    <h2>코드 목록</h2>
    <router-link :to="{ name: 'CodeDetailRegisterPage' }">새로만들기</router-link>
    <code-detail-list :codeDetails="codeDetails"/>
  </div>
</template>

<script>
import CodeDetailList from '/@components/codedetail/CodeDetailList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'CodeDetailListPage',
  components: { CodeDetailList },
  setup() {
    const codeDetails = inject("codeDetails")
    const fetchCodeDetailList = inject("fetchCodeDetailList")

    onMounted (() => {
      fetchCodeDetailList()
    })

    return {
      codeDetails,
    }
  },
}
</script>
