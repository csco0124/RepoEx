<template>
  <div align="center">
    <h2>공개자료실 등록</h2>
    <pds-register-form @add-post="addPost"
        @add-attach="addAttachment"
        @remove-attach="removeAttachment"
        :attachments="attachments"/>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import PdsRegisterForm from '/@components/pds/PdsRegisterForm.vue'
import { router } from '/@router/router.js'
import { inject } from 'vue'

export default {
  name: 'PdsRegisterPage',
  components: { PdsRegisterForm },
  setup() {
    const attachments = inject("attachments")

    const addAttach = inject("addAttach")
    const removeAttach = inject("removeAttach")

    const addPost = (payload) => {
      const { itemName, description } = payload

      const itemObject = {
        itemName : itemName,
        description : description,
        files : attachments.value
      }

      client.post('/pds', itemObject)
        .then(res => {
          alert('등록이 완료되었습니다.')
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
      attachments,
      addPost,
      addAttachment,
      removeAttachment,
    }
  },
}
</script>
