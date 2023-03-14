<template>
  <form @submit.prevent="fireAddPost">
    <table>
			<tr>
				<td>그룹코드</td>
				<td>
					<select v-model="groupCode">
            <option v-for="codeGroup in codeGroups" :value="codeGroup.groupCode" :key="codeGroup.groupCode">
              {{codeGroup.groupName}}
            </option>
          </select>
				</td>
			</tr>
			<tr>
				<td>코드값</td>
				<td><input v-model="codeValue" type="text" /></td>
			</tr>
			<tr>
				<td>코드명</td>
				<td><input v-model="codeName" type="text" /></td>
			</tr>
		</table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'CodeDetailListView' }">목록</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CodeDetailRegisterForm',
  props: {
    codeGroups: {
      type: Array
    }
  },
  emits: ['add-post'],
  setup(props, context) {
    const groupCode = ref('A01')
    const codeValue = ref('')
    const codeName = ref('')

    const fireAddPost = () => {
      context.emit('add-post', {
        groupCode: groupCode.value, 
        codeValue: codeValue.value, 
        codeName: codeName.value 
      })
    }

    return {
      groupCode,
      codeValue,
      codeName,
      fireAddPost,
    }
  },
}
</script>
