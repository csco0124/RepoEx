<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tr>
				<td>상품번호</td>
				<td><input :value="item.itemId" type="text" disabled></td>
			</tr>
			<tr>
				<td>상품명</td>
				<td><input type="text" v-model="item.itemName"></td>
			</tr>
			<tr>
				<td>상품가격</td>
				<td><input type="text" v-model="item.price">&nbsp;원</td>
			</tr>
			<tr>
				<td>상품파일</td>
				<td><input type="file" @change="handleFileChange($event)" /></td>
			</tr>
			<tr>
				<td>미리보기파일</td>
				<td><input type="file" @change="handlePreviewFileChange($event)" /></td>
			</tr>
			<tr>
				<td>상품설명</td>
				<td><textarea v-model="item.description" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'ItemReadView', params: { itemId: item.itemId.toString() } }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ItemModifyForm',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['modify-post'],
  setup(props, context) {
    const file = ref('')
    const previewFile = ref('')

    const handleFileChange = (evt) => {
      file.value = evt.target.files[0]
    }

    const handlePreviewFileChange = (evt) => {
      previewFile.value = evt.target.files[0]
    }

    const fireModifyPost = () => {
      context.emit('modify-post', { 
        itemName: props.item.itemName,
        price: props.item.price,
        description: props.item.description,
        file: file.value,
        previewFile: previewFile.value,
      })
    }

    return {
      file,
      previewFile,
      fireModifyPost,
      handleFileChange,
      handlePreviewFileChange,
    }
  },
}
</script>
