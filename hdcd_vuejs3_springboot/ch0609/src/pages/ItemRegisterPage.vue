<template>
  <div align="center">
    <h2>상품 등록</h2>
    <item-register-form @add-post="addPost"/>
  </div>
</template>

<script>
import ItemRegisterForm from '../components/ItemRegisterForm.vue'
import client from '../modules/client.js'
import { router } from '../router/router.js'

export default {
  name: 'ItemRegisterPage',
  components: { ItemRegisterForm },
  setup() {
    const addPost = (payload) => {
      const { itemName, price, description, file } = payload

      const itemObject = {
        itemName : itemName,
        price : price,
        description : description
      }

      const formData = new FormData()
		  formData.append("file", file)
		  formData.append("item", JSON.stringify(itemObject))

      client.post('/items', 
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
        .then(res => {
          alert('등록되었습니다.')
          router.push({
            name: 'ItemReadPage',
            params: { itemId: res.data.itemId }
          })
        })
        .catch(err => {
          alert(err.response.data.msg)
        })
    }

    return {
      addPost,
    }
  },
}
</script>
