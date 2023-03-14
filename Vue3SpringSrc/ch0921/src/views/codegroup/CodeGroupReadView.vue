<template>
  <div align="center">
    <h2>코드그룹 상세보기</h2>
    <code-group-read v-if="codeGroup" :codeGroup="codeGroup"/>
    <router-link :to="{ name: 'CodeGroupModifyView', params: { groupCode } }">편집</router-link>
    <button @click="deletePost">삭제</button>
    <router-link :to="{ name: 'CodeGroupListView' }">목록</router-link>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import CodeGroupRead from '../../components/codegroup/CodeGroupRead.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'CodeGroupReadView',
  components: { CodeGroupRead },
  props: {
    groupCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const codeGroup = inject("codeGroup")
    const fetchCodeGroup = inject("fetchCodeGroup")

    fetchCodeGroup(props.groupCode)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const deletePost = () => {
      const { groupCode } = codeGroup.value
      client.delete(`/codegroups/${groupCode}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({ name: 'CodeGroupListView' })
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
      codeGroup,
      deletePost,
    }
  },
}
</script>
