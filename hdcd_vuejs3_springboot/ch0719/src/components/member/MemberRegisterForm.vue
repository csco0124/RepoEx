<template>
  <form @submit.prevent="fireAddPost">
    <table>
			<tr>
				<td>아이디</td>
				<td><input type="text" v-model="userId"></td>
			</tr>
			<tr>
				<td>비밀번호</td>
				<td><input type="password" v-model="userPw"></td>
			</tr>
			<tr>
				<td>사용자명</td>
				<td><input type="text" v-model="userName"></td>
			</tr>
			<tr>
				<td>직업</td>
				<td>
					<select v-model="job">
            <option v-for="jobCode in jobCodes" :value="jobCode.value" :key="jobCode.value">
              {{jobCode.label}}
            </option>
          </select>
				</td>
			</tr>
		</table>

    <div>
      <button type="submit">등록</button>
      <router-link :to="{ name: 'MemberListPage' }">목록</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MemberRegisterForm',
  props: {
    jobCodes: {
      type: Array
    }
  },
  emits: ['add-post'],
  setup(props, context) {
    const userId = ref('')
    const userName = ref('')
    const userPw = ref('')
    const job = ref('00')

    const fireAddPost = () => {
      context.emit('add-post', { 
        userId: userId.value, 
        userName: userName.value,
        userPw: userPw.value, 
        job: job.value,
      })
    }

    return {
      userId,
      userName,
      userPw,
      job,
      fireAddPost,
    }
  },
}
</script>
