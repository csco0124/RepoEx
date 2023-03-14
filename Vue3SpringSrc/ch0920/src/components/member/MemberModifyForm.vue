<template>
  <form @submit.prevent="fireModifyPost">
    <table>
      <tr>
				<td>번호</td>
				<td><input type="text" :value="member.userNo" disabled></td>	
			</tr>
			<tr>
				<td>아이디</td>
				<td><input type="text" :value="member.userId" disabled></td>	
			</tr>
			<tr>
				<td>사용자명</td>
				<td><input type="text" v-model="member.userName"></td>	
			</tr>
			<tr>
				<td>직업</td>
				<td>
					<select v-model="member.job">
            <option v-for="jobCode in jobCodes" :value="jobCode.value" :key="jobCode.value">
              {{jobCode.label}}
            </option>
          </select>
				</td>
			</tr>
			<tr>
				<td>권한</td>
				<td>
					<select v-model="member.authList[0].auth">
            <option value="" selected="selected">=== 선택해 주세요 ===</option>
            <option value="ROLE_USER">사용자</option>
            <option value="ROLE_MEMBER">회원</option>
            <option value="ROLE_ADMIN">관리자</option>
          </select>
				</td>
			</tr>
		</table>

    <div>
      <button type="submit">수정</button>
      <router-link :to="{ name: 'MemberReadView', params: { userNo: member.userNo } }">취소</router-link>
    </div>
  </form>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MemberModifyForm',
  props: {
    member: {
      type: Object,
      required: true
    },
    jobCodes: {
      type: Array
    }
  },
  emits: ['modify-post'],
  setup(props, context) {
    const userId = props.member.userId
    const userPw = props.member.userPw

    const fireModifyPost = () => {
      const userNo = props.member.userNo
      const userName = props.member.userName
      const job = props.member.job
      const auth = props.member.authList[0].auth

      const userObject = {
        userId : userId,
        userPw : userPw,
        userName : userName,
        job : job,
        authList : [
              {
                userNo : userNo,
                auth : auth
              },
              {
                userNo : userNo,
                auth : ''
              },
              {
                userNo : userNo,
                auth : ''
              }
            ]
      }

      context.emit('modify-post', userObject)
    }

    return {
      userId,
      userPw,
      fireModifyPost,
    }
  },
}
</script>
