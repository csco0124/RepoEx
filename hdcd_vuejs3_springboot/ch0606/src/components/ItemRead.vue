<template>
  <div>
    <!--
    <h3>상품 상세보기 뷰</h3>
    -->
    <table>
      <tr>
				<td>상품번호</td>
				<td><input type="text" :value="item.itemId"></td>
			</tr>
			<tr>
				<td>상품명</td>
				<td><input type="text" :value="item.itemName"></td>
			</tr>
			<tr>
				<td>상품가격</td>
				<td><input type="text" :value="item.price">&nbsp;원</td>
			</tr>
			<tr>
				<td>미리보기</td>
				<td><img v-bind:src="pictureUrl()" width="200"></td>
			</tr>		
			<tr>
				<td>상품설명</td>
				<td><textarea :value="item.description"></textarea></td>
			</tr>
		</table>
  </div>
</template>

<script>
export default {
  name: 'ItemRead',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pictureUrl = () => {
      return 'http://localhost:8080/items/display?itemId=' + props.item.itemId + "&timestamp=" + new Date().getTime()
    }

    return {
      pictureUrl,
    }
  },
}
</script>
