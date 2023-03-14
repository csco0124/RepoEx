<template>
  <form @submit.prevent="fireAddPost">
    <table>
			<tr>
				<td>자료명</td>
				<td><input type="text" v-model="itemName"></td>
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
				<td><textarea v-model="description" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'PdsListView' }">목록</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PdsRegisterForm',
  props: {
    attachments: {
      type: Array
    }
  },
  emits: ['add-post', 'add-attach', 'remove-attach'],
  setup(props, context) {
    const itemName = ref('')
    const description = ref('')
    const file = ref('')

    const fireAddPost = () => {
      context.emit('add-post', {
        itemName: itemName.value,
        description: description.value,
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
      itemName,
      description,
      file,
      fireAddPost,
      handleFileChange,
      getOriginalName,
      removeAttach,
    }
  },
}
</script>
