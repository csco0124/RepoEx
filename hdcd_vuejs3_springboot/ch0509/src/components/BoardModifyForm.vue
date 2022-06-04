<template>
	<!--
	<div>
    <h3>게시판 수정 폼</h3>
    <button type="submit">수정</button>
    <router-link :to="{ name: 'BoardReadPage', params: { boardNo: 100 } }">취소</router-link>
  </div>
	-->
  <form @submit.prevent="fireModifyPost">
    <table>
      <tr>
				<td>번호</td>
				<td><input :value="board.boardNo" type="text" disabled></td>
			</tr>
      <tr>
				<td>등록일시</td>
				<td><input :value="board.regDate" type="text" disabled></td>
			</tr>
			<tr>
				<td>제목</td>
				<td><input type="text" v-model="board.title"></td>
			</tr>
			<tr>
				<td>작성자</td>
				<td><input type="text" :value="board.writer" disabled></td>
			</tr>
			<tr>
				<td>내용</td>
				<td><textarea v-model="board.content" rows="5"></textarea></td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'BoardReadPage', params: { boardNo: boardNo } }">취소</router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BoardModifyForm',
  props: {
    board: {
      type: Object,
      required: true
    },
    boardNo: {
      type: String,
      required: true
    },
  },
  emits: ['modify-post'],
  setup(props, context) {
    const fireModifyPost = () => {
      context.emit('modify-post', {
        title: props.board.title,
        content: props.board.content
      })
    }

    return {
      fireModifyPost,
    }
  },
}
</script>
