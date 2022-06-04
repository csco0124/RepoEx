<template>
  <form @submit.prevent="fireModifyPost">
    <table>
			<tr>
				<td>코드그룹코드</td>
				<td><input type="text" :value="codeGroup.groupCode" disabled></td>
			</tr>
			<tr>
				<td>코드그룹명</td>
				<td><input type="text" v-model="codeGroup.groupName"></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'CodeGroupReadPage', params: { groupCode: codeGroup.groupCode } }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { ref, inject, onMounted } from 'vue'

export default {
  name: 'CodeGroupModifyForm',
  props: {
    codeGroup: {
      type: Object,
      required: true
    }
  },   
  emits: ['modify-post'],
  setup(props, context) {
    const fireModifyPost = () => {
      context.emit('modify-post', { groupName: props.codeGroup.groupName })
    }

    return {
      fireModifyPost,
    }
  },
}
</script>
