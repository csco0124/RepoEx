<template>
  <div align="center">
    <h2>회원 수정</h2>
    <member-modify-form v-if="member && jobCodes"
        :member="member"
        :jobCodes="jobCodes"
        @modify-post="modifyPost" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import MemberModifyForm from '/@components/member/MemberModifyForm.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'MemberModifyPage',
  components: { MemberModifyForm },
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

    const modifyPost = (payload) => {
      client.put(`/users/${props.userNo}`, payload)
        .then(res => {
          alert('수정이 완료되었습니다.')
          router.push({
            name: 'MemberReadPage',
            params: { userNo: res.data.userNo }
          })
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
      modifyPost,
    }
  },
}
</script>
