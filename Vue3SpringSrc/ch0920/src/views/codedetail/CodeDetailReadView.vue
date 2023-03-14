<template>
  <div align="center">
    <h2>코드 상세보기</h2>
    <code-detail-read v-if="codeDetail && codeGroups"
        :codeDetail="codeDetail"
        :codeGroups="codeGroups"/>
    <router-link :to="{ name: 'CodeDetailModifyView', params: { groupCode, codeValue } }">편집</router-link>
    <button @click="deletePost">삭제</button>
    <router-link :to="{ name: 'CodeDetailListView' }">목록</router-link>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import CodeDetailRead from '../../components/codedetail/CodeDetailRead.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'CodeDetailReadView',
  components: { CodeDetailRead },
  props: {
    groupCode: {
      type: String,
      required: true
    },
    codeValue: {
      type: String,
      required: true
    }
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

    const deletePost = () => {
      const { groupCode, codeValue } = codeDetail.value
      client.delete(`/codedetails/${groupCode}/${codeValue}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'CodeDetailListView'})
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
      deletePost,
    }
  },
}
</script>
