<template>
  <div align="center">
    <h2>공지사항 수정</h2>
    <notice-modify-form v-if="notice"
                    :notice="notice"
                    @modify-post="modifyPost" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import NoticeModifyForm from '/@components/notice/NoticeModifyForm.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'NoticeModifyPage',
  components: { NoticeModifyForm },
  props: {
    noticeNo: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const notice = inject("notice")
    const fetchNotice = inject("fetchNotice")

    fetchNotice(props.noticeNo)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const modifyPost = (payload) => {
      const { title, content } = payload
      client.put(`/notices/${props.noticeNo}`, { title, content })
        .then(res => {
          alert('수정이 완료되었습니다.')
          router.push({
            name: 'NoticeReadPage',
            params: { noticeNo: res.data.noticeNo.toString() }
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
      notice,
      modifyPost,
    }
  },
}
</script>
