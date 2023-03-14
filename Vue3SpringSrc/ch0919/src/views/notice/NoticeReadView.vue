<template>
  <div align="center">
    <h2>공지사항 상세보기</h2>
    <notice-read v-if="notice" :notice="notice"/>
    <p v-else>loading...</p>
    <template v-if="isAdmin">
      <router-link :to="{ name: 'NoticeModifyView', params: { noticeNo } }">편집</router-link>
      <button @click="deletePost">삭제</button>
    </template>
    <router-link :to="{ name: 'NoticeListView' }">목록</router-link>
  </div>
</template>

<script>
import client from '../../modules/client.js'
import NoticeRead from '../../components/notice/NoticeRead.vue'
import { router } from '../../router/router.js'
import { inject } from 'vue'

export default {
  name: 'NoticeReadView',
  components: { NoticeRead },
  props: {
    noticeNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isAdmin = inject("isAdmin")

    const notice = inject("notice")
    const fetchNotice = inject("fetchNotice")

    fetchNotice(props.noticeNo)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const deletePost = () => {
      const {noticeNo} = notice.value
      client.delete(`/notices/${noticeNo}`)
        .then(res => {
          alert('삭제가 완료되었습니다.')
          router.push({name: 'NoticeListView'})
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
      isAdmin,
      notice,
      deletePost,
    }
  },
}
</script>
