<template>
  <div align="center">
    <h2>코드 수정</h2>
    <code-detail-modify-form v-if="codeGroups && codeDetail"
        :codeDetail="codeDetail"
        :codeGroups="codeGroups"
        @modify-post="modifyPost" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import CodeDetailModifyForm from '../../components/codedetail/CodeDetailModifyForm.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'CodeDetailModifyView',
  components: { CodeDetailModifyForm },
  props: {
    groupCode: {
      type: String,
      required: true
    },
    codeValue: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const codeGroups = inject("codeGroups")
    const codeDetail = inject("codeDetail")
    const fetchCodeGroupList = inject("fetchCodeGroupList")
    const fetchCodeDetail = inject("fetchCodeDetail")

    fetchCodeGroupList()
      .then(res => {
        fetchCodeDetail({ groupCode: props.groupCode, codeValue: props.codeValue })
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
      const { codeValue, codeName } = payload

      client.put(`/codedetails/${props.groupCode}/${props.codeValue}`, { codeValue, codeName })
        .then(res => {
          alert('수정이 완료되었습니다.')
          router.push({
            name: 'CodeDetailReadView',
            params: { groupCode: res.data.groupCode, codeValue: res.data.codeValue }
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
      codeGroups,
      codeDetail,
      modifyPost,
    }
  },
}
</script>
