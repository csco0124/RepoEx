<template>
  <div align="center">
    <h2>회원 목록</h2>
    <router-link :to="{ name: 'MemberRegisterView' }">새로만들기</router-link>
    <member-list :members="members"/>
  </div>
</template>

<script>
import MemberList from '../../components/member/MemberList.vue'
import { inject, onMounted } from 'vue'

export default {
  name: 'MemberListView',
  components: { MemberList },
  setup() {
    const members = inject("members")
    const fetchMemberList = inject("fetchMemberList")

    onMounted (() => {
      fetchMemberList()
    })

    return {
      members,
    }
  },
}
</script>
