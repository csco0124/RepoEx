<template>
  <div align="center">
    <h2>그룹코드 목록</h2>
    <router-link :to="{ name: 'CodeGroupRegisterView' }">새로만들기</router-link>
    <code-group-list :codeGroups="codeGroups"/>
  </div>
</template>

<script>
import CodeGroupList from '../../components/codegroup/CodeGroupList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'CodeGroupListView',
  components: { CodeGroupList },
  setup() {
    const codeGroups = inject("codeGroups")
    const fetchCodeGroupList = inject("fetchCodeGroupList")

    onMounted (() => {
      fetchCodeGroupList()
    })

    return {
      codeGroups,
    }
  },
}
</script>
