<template>
  <div>
    <table>
      <tr>
				<td>상품번호</td>
				<td><input type="text" :value="userItem.userItemNo" readonly></td>
			</tr>
			<tr>
				<td>상품명</td>
				<td><input type="text" :value="userItem.itemName" readonly></td>
			</tr>
			<tr>
				<td>상품가격</td>
				<td><input type="text" :value="userItem.price" readonly></td>
			</tr>	
			<tr>
				<td>상품파일</td>
				<td><img :src="pictureUrl()" width="210" height="240"></td>
			</tr>	
			<tr>
				<td>상품설명</td>
				<td><textarea :value="userItem.description" readonly></textarea></td>
			</tr>
		</table>
  </div>
</template>

<script>
export default {
  name: 'UserItemRead',
  props: {
    userItem: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const pictureUrl = () => {
      return 'http://localhost:8080/items/display?itemId=' + props.userItem.itemId + "&timestamp=" + new Date().getTime()
    }

    return {
      pictureUrl,
    }
  },
}
</script>
