<template>
  <div align="center">
    <h2>공개자료실 수정</h2>
    <pds-modify-form v-if="pdsItem && attachments"
        :pdsItem="pdsItem"
        :attachments="attachments"
        @modify-post="modifyPost"
        @add-attach="addAttachment"
        @remove-attach="removeAttachment" />
    <p v-else>loading...</p>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import PdsModifyForm from '/@components/pds/PdsModifyForm.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'PdsModifyPage',
  components: { PdsModifyForm },
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const pdsItem = inject("pdsItem")
    const attachments = inject("attachments")

    const addAttach = inject("addAttach")
    const removeAttach = inject("removeAttach")
    const fetchPds = inject("fetchPds")

    fetchPds(props.itemId)
      .catch(err => {
        alert(err.response.data.message)
        router.back()
      })

    const modifyPost = (payload) => {
      const { itemName, description } = payload

      const itemObject = {
        itemId : props.itemId,
        itemName : itemName,
        description : description,
        files : attachments.value
      }

      client.put(`/pds/${props.itemId}`, itemObject)
        .then(res => {
          alert('수정이 완료되었습니다.')
          router.push({
            name: 'PdsReadPage',
            params: { itemId: res.data.itemId.toString() }
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
    
    const addAttachment = (payload) => {
      const { file } = payload
      addAttach(file)
    }

    const removeAttachment = (index) => {
      removeAttach(index)
    }

    return {
      pdsItem,
      attachments,
      modifyPost,
      addAttachment,
      removeAttachment,
    }
  },
}
</script>
