<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tr>
				<td>번호</td>
				<td><input type="text" :value="notice.noticeNo" disabled></td>
			</tr>
			<tr>
				<td>제목</td>
				<td><input type="text" v-model="notice.title"></td>
			</tr>
			<tr>
				<td>내용</td>
				<td><textarea v-model="notice.content" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'NoticeReadView', params: { noticeNo: notice.noticeNo.toString() } }">취소</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'NoticeModifyForm',
  props: {
    notice: {
      type: Object,
      required: true
    }
  },
  emits: ['modify-post'],
  setup(props, context) {
    const fireModifyPost = () => {
      context.emit('modify-post', { 
        title: props.notice.title,
        content: props.notice.content,
      })
    }

    return {
      fireModifyPost,
    }
  },
}
</script>
