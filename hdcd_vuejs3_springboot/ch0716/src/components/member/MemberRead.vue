<template>
  <div>
    <table>
      <tr>
				<td>번호</td>
				<td><input type="text" :value="member.userNo" readonly></td>	
			</tr>
			<tr>
				<td>아이디</td>
				<td><input type="text" :value="member.userId" readonly></td>	
			</tr>
			<tr>
				<td>사용자명</td>
				<td><input type="text" :value="member.userName" readonly></td>	
			</tr>
			<tr>
				<td>직업</td>
				<td>
					<select :value="member.job" disabled>
            <option v-for="jobCode in jobCodes" :value="jobCode.value" :key="jobCode.value">
              {{jobCode.label}}
            </option>
          </select>
				</td>
			</tr>
			<tr>
				<td>권한</td>
				<td>
					<select :value="auth">
            <option value="" selected="selected">=== 선택해 주세요 ===</option>
            <option value="ROLE_USER">사용자</option>
            <option value="ROLE_MEMBER">회원</option>
            <option value="ROLE_ADMIN">관리자</option>
          </select>
				</td>
			</tr>
		</table>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MemberRead',
  props: {
    member: {
      type: Object,
      required: true
    },
    jobCodes: {
      type: Array
    }
  },
  setup(props) {
    const auth = computed(() => {
      if (props.member.authList[0]) {
        return props.member.authList[0].auth
      }

      return ''
    })
        
    return {
      auth,
    }
  },
}
</script>
