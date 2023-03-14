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
          </template>
          <template v-else>
            <td width="120"><router-link :to="{ name: 'Home' }">홈</router-link></td>
            <td width="120"><router-link :to="{ name: 'BoardListView' }">회원게시판</router-link></td>
          </template>
        </template>
        <template v-else>
          <td width="120"><router-link :to="{ name: 'Home' }">홈</router-link></td>
          <td width="120"><router-link :to="{ name: 'BoardListView' }">회원게시판</router-link></td>
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
