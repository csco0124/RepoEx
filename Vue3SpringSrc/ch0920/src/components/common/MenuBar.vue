<template>
  <div align="center">
    <table>
			<tr>
        <template v-if="isAuthorized">
          <template v-if="isAdmin">
            <td width="120"><router-link :to="{ name: 'Home' }">홈</router-link></td>
            <td width="120"><router-link :to="{ name: 'CodeGroupListView' }">코드그룹관리</router-link></td>
            <td width="120"><router-link :to="{ name: 'CodeDetailListView' }">코드관리</router-link></td>
            <td width="120"><router-link :to="{ name: 'MemberListView' }">회원관리</router-link></td>
            <td width="120"><router-link :to="{ name: 'BoardListView' }">회원게시판</router-link></td>
            <td width="120"><router-link :to="{ name: 'NoticeListView' }">공지사항관리</router-link></td>
            <td width="120"><router-link :to="{ name: 'ItemListView' }">상품관리</router-link></td>
          </template>
          <template v-else>
            <td width="120"><router-link :to="{ name: 'Home' }">홈</router-link></td>
            <td width="120"><router-link :to="{ name: 'BoardListView' }">회원게시판</router-link></td>
            <td width="120"><router-link :to="{ name: 'NoticeListView' }">공지사항</router-link></td>
            <td width="120"><router-link :to="{ name: 'ItemListView' }">상품</router-link></td>
            <td width="120"><router-link :to="{ name: 'CoinChargeRegisterView' }">코인충전</router-link></td>
            <td width="120"><router-link :to="{ name: 'CoinChargeListView' }">충전내역</router-link></td>
          </template>
        </template>
        <template v-else>
          <td width="120"><router-link :to="{ name: 'Home' }">홈</router-link></td>
          <td width="120"><router-link :to="{ name: 'BoardListView' }">회원게시판</router-link></td>
          <td width="120"><router-link :to="{ name: 'NoticeListView' }">공지사항</router-link></td>
          <td width="120"><router-link :to="{ name: 'ItemListView' }">상품</router-link></td>
        </template>
      </tr>
		</table>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'MenuBar',
  setup() {
    const isAuthorized = inject("isAuthorized")
    const isAdmin = inject("isAdmin")

    return {
      isAuthorized,
      isAdmin,
    }
  },
}
</script>
