<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tr>
				<td>자료번호</td>
				<td><input type="text" :value="pdsItem.itemId" disabled></td>
			</tr>
			<tr>
				<td>자료명</td>
				<td><input type="text" v-model="pdsItem.itemName"></td>
			</tr>
			<tr>
				<td>파일</td>
				<td>
					<input type="file" @change="handleFileChange($event)" />
          <div>
            <div v-for="(attachment, index) in attachments" :key="index">{{getOriginalName(attachment)}}<span @click="removeAttach(index)">X</span></div>
          </div>
				</td>
			</tr>
			<tr>
				<td>자료설명</td>
				<td><textarea v-model="pdsItem.description" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'PdsReadView', params: { itemId: pdsItem.itemId.toString() } }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PdsModifyForm',
  props: {
    pdsItem: {
      type: Object,
      required: true
    },
    attachments: {
      type: Array
    }
  },
  emits: ['modify-post', 'add-attach', 'remove-attach'],
  setup(props, context) {
    const file = ref('')

    const fireModifyPost = () => {
      context.emit('modify-post', { 
        itemName: props.pdsItem.itemName,
        description: props.pdsItem.description,
        file: file.value,
      })
    }

    const handleFileChange = (evt) => {
      file.value = evt.target.files[0]

      context.emit('add-attach', { file: file.value })
    }

    const getOriginalName = (fileName) => {
      const idx = fileName.indexOf("_") + 1
      
      return fileName.substr(idx)
    }

    const removeAttach = (index) => {
      context.emit('remove-attach', index)
    }

    return {
      file,
      fireModifyPost,
      handleFileChange,
      getOriginalName,
      removeAttach,
    }
  },
}
</script>
