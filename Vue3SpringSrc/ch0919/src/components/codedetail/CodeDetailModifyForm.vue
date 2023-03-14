<template>
  <form @submit.prevent="fireModifyPost">
    <table>
			<tr>
				<td>그룹코드</td>
				<td>
          <select v-model="codeDetail.groupCode" disabled>
            <option v-for="codeGroup in codeGroups" :value="codeGroup.groupCode" :key="codeGroup.groupCode">
              {{codeGroup.groupName}}
            </option>
          </select>
				</td>
			</tr>
			<tr>
				<td>코드값</td>
				<td><input v-model="codeDetail.codeValue" type="text" /></td>
			</tr>
			<tr>
				<td>코드명</td>
				<td><input v-model="codeDetail.codeName" type="text" /></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'CodeDetailReadView', params: { groupCode: codeDetail.groupCode, codeValue: codeDetail.codeValue } }">취소</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'CodeDetailModifyForm',
  props: {
    codeGroups: {
      type: Array
    },
    codeDetail: {
      type: Object,
      required: true
    }
  },
  emits: ['modify-post'],
  setup(props, context) {
    const fireModifyPost = () => {
      context.emit('modify-post', { 
        groupCode: props.codeDetail.groupCode, 
        codeValue: props.codeDetail.codeValue, 
        codeName: props.codeDetail.codeName })
    }

    return {
      fireModifyPost,
    }
  },
}
</script>
