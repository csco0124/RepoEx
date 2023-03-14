<template>
  <form v-on:submit.prevent="onSubmit">
    <table>
      <tr>
        <td>사용자아이디</td>
        <td>
          <input type="text" v-model="member.userId">
        </td>
      </tr>
      <tr>
        <td>비밀번호</td>
        <td>
          <input type="password" v-model="member.userPw">
        </td>
      </tr>
      <tr>
        <td>소개</td>
        <td>
          <textarea rows="5" v-model="member.introduction"></textarea>
        </td>
      </tr>
    </table>

    <p>
      <button type="submit">등록</button>
      <button v-on:click="onClick">리셋</button>
    </p>
  </form>

  <p>userId : {{member.userId}}</p>
  <p>userPw : {{member.userPw}}</p>
  <p>introduction : {{member.introduction}}</p>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const userId = ''
    const userPw = ''
    const introduction = ''
    
    const member = reactive({
      userId,
      userPw,
      introduction,
    })

    const onSubmit = () => {
      console.log('userId :', member.userId)
      console.log('userPw :', member.userPw)
      console.log('introduction :', member.introduction)
    }

    const onClick = () => {
      member.userId = ''
      member.userPw = ''
      member.introduction = ''
    }

    return {    
      member,
      onSubmit,
      onClick,
    }
  },
}
</script>
