<template>
  
  <form @submit.prevent="fireAddPost">
    <table>
			<tr>
				<td>상품명</td>
				<td><input type="text" v-model="itemName"></td>
			</tr>
			<tr>
				<td>상품가격</td>
				<td><input type="text" v-model="price">&nbsp;원</td>
			</tr>
			<tr>
				<td>상품파일</td>
				<td><input type="file" @change="changeFile($event)" /></td>
				<td></td>
			</tr>
			<tr>
				<td>상품설명</td>
				<td><textarea v-model="description" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'ItemListView' }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ItemRegisterForm',
  emits: ['add-post'],
  setup(props, context) {
    const itemName = ref('')
    const price = ref('')
    const description = ref('')
    const file = ref('')

    const fireAddPost = () => {
      context.emit('add-post', {
        itemName: itemName.value,
        price: price.value,
        description: description.value,
        file: file.value
      })
    }

    const changeFile = (evt) => {
      file.value = evt.target.files[0]
    }

    return {
      itemName,
      price,
      description,
      file,
      fireAddPost,
      changeFile,
    }
  },
}
</script>
