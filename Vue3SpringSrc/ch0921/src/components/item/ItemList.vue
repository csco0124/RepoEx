<template>
  <div>
    <table border="1">
      <tr>
        <th align="center" width="80">상품아이디</th>
        <th align="center" width="320">상품명</th>
        <th align="center" width="100">상품가격</th>
      </tr>

      <tr v-if="!items || (Array.isArray(items) && items.length === 0)">
        <td colspan="3">
          List is empty.
        </td>
      </tr>

      <tr v-else v-for="item in items" :key="item.itemId">
        <td align="center">{{ item.itemId }}</td>
        <td align="left"><router-link :to="{ name: 'ItemReadView', params: { itemId: item.itemId.toString() } }">{{ item.itemName }}</router-link></td>
        <td align="right">{{ item.price }} 원</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array
    }
  }
}
</script>
