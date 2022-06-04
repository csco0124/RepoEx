<template>
  <div align="center">
    <h2>회원 상세보기</h2>
    <member-read v-if="member && jobCodes"
        :member="member"
        :jobCodes="jobCodes"/>
    <p v-else>loading...</p>
    <router-link :to="{ name: 'MemberModifyPage', params: { userNo } }">편집</router-link>
    <button @click="deletePost">삭제</button>
    <router-link :to="{ name: 'MemberListPage' }">목록</router-link>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import MemberRead from '/@components/member/MemberRead.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'MemberReadPage',
  components: { MemberRead },
  props: {
    userNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const member = inject("member")
    const jobCodes = inject("jobCodes")
    const fetchJobCodeList = inject("fetchJobCodeList")
    const fetchMember = inject("fetchMember")

    fetchJobCodeList()
      .then(res => {
        fetchMember(props.userNo)
          .catch(err => {
            alert(err.response.data.message)
            router.back()
          })
      })
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })    

    const deletePost = () => {
      const { userNo } = member.value
      client.delete(`/users/${userNo}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'MemberListPage'})
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert('로그인이 필요합니다.')
            router.push({ name: 'Signin' })
          } else if (err.response.status === 403) {
            alert('접근 권한이 없습니다.')
            router.back()
          } else {
            alert(err.response.data.message)
          }
        })
    }

    return {
      member,
      jobCodes,
      deletePost,
    }
  },
}
</script>
