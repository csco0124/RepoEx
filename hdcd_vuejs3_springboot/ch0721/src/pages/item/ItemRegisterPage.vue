<template>
  <div align="center">
    <h2>상품 등록</h2>
    <item-register-form @add-post="addPost"/>
  </div>
</template>

<script>
import client from '/@modules/client.js'
import ItemRegisterForm from '/@components/item/ItemRegisterForm.vue'
import { router } from '/@router/router.js'

export default {
  name: 'ItemRegisterPage',
  components: { ItemRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { itemName, price, description, file, previewFile } = payload

      const itemObject = {
        itemName : itemName,
        price : price,
        description : description
      }

      let formData = new FormData()
		
      formData.append("file", file)
      formData.append("file2", previewFile)
		  formData.append("item",JSON.stringify(itemObject))

      client.post('/items', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          alert('등록이 완료되었습니다.')
          router.push({
            name: 'ItemReadPage',
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

    return {
      addPost,
    }
  },
}
</script>
