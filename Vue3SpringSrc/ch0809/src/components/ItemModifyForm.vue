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
				<td><input type="file" @change="changeFile($event)" /></td>
			</tr>
			<tr>
				<td>미리보기</td>
				<td><img v-bind:src="pictureUrl()" width="200"></td>
			</tr>
			<tr>
				<td>상품설명</td>
				<td><textarea v-model="item.description" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'ItemReadView', params: { itemId: itemId } }">취소</router-link>
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
    },
    itemId: {
      type: String,
      required: true
    },
  },
  emits: ['modify-post'],
  setup(props, context) {
    const file = ref('')

    const fireModifyPost = () => {
      context.emit('modify-post', {
        itemName: props.item.itemName,
        price: props.item.price,
        description: props.item.description,
        file: file.value
      })
    }

    const changeFile = (evt) => {
      file.value = evt.target.files[0]
    }

    const pictureUrl = () => {
      return 'http://localhost:8080/items/display?itemId=' + props.itemId + "&timestamp=" + new Date().getTime()
    }

    return {
      fireModifyPost,
      changeFile,
      pictureUrl,
    }
  },
}
</script>
