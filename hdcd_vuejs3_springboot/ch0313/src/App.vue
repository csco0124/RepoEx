<template>
  <form v-on:submit.prevent="onSubmit">
    <table>
      <tr>
        <td>사용자아이디</td>
        <td>
          <input type="text" v-on:input="userId = $event.target.value" v-bind:value="userId">
        </td>
      </tr>
      <tr>
        <td>비밀번호</td>
        <td>
          <input type="password" v-on:change="userPw = $event.target.value" v-bind:value="userPw">
        </td>
      </tr>
      <tr>
        <td>소개</td>
        <td><textarea rows="5" v-model="introduction"></textarea></td>
      </tr>
      <tr>
        <td>개발자여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox">
        </td>
      </tr>
      <tr>
        <td>개발자여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox()">
        </td>
      </tr>
      <tr>
        <td>개발자여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox2">
        </td>
      </tr>
      <tr>
        <td>개발자여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox2($event)">
        </td>
      </tr>
      <tr>
        <td>개발자여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox3('cheked!!!')">
        </td>
      </tr>
      <tr>
        <td>외국인여부</td>
        <td>
          <input type="checkbox" v-on:change="handleCheckBox4('cheked!!!', $event)" true-value="yes" false-value="no">
        </td>
      </tr>
      <tr>
        <td>취미</td>
        <td>
          <input type="checkbox" id="chkSports" value="Sports" v-model="hobbyList">
          <label for="chkSports">Sports</label>
          <input type="checkbox" id="chkMusic" value="Music" v-model="hobbyList">
          <label for="chkMusic">Music</label>
          <input type="checkbox" id="chkMovie" value="Movie" v-model="hobbyList">
          <label for="chkMovie">Movie</label>
        </td>
      </tr>
      <tr>
        <td>성별</td>
        <td>
          <input type="radio" id="rdoMale" value="male" v-model="gender">
          <label for="rdoMale">Male</label>
          <input type="radio" id="rdoFemale" value="female" v-model="gender">
          <label for="rdoFemale">Female</label>
        </td>
      </tr>
      <tr>
        <td>국적</td>
        <td>
          <select v-model="nationality">
            <option disabled value="">Please select one</option>
            <option value="01">Korea</option>
            <option value="02">Germany</option>
            <option value="03">Australia</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>소유차량</td>
        <td>
          <select v-model="carList" multiple>
            <option>Volvo</option>
            <option>Saab</option>
            <option>Opel</option>
          </select>
        </td>
      </tr>
    </table>

    <p>
      <button type="submit">등록</button>
    </p>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const userId = ref("")
    const userPw = ref("")
    const introduction = ref("")
    const developer = ref(false)
    const foreigner = ref("no")
    const hobbyList = ref([])
    const gender = ref("male")
    const nationality = ref("")
    const carList = ref([])

    const onSubmit = () => {
      console.log('userId :', userId.value)
      console.log('userPw :', userPw.value)
      console.log('introduction :', introduction.value)
      console.log('developer :', developer.value)
      console.log('foreigner :', foreigner.value)
      console.log('hobbyList :', hobbyList.value)
      console.log('gender :', gender.value)
      console.log('nationality :', nationality.value)
      console.log('carList :', carList.value)
    }

    const handleCheckBox = () => {
      console.log('handleCheckBox')
    }

    const handleCheckBox2 = (event) => {
      console.log('handleCheckBox2 event :', event)
    }

    const handleCheckBox3 = (message) => {
      console.log('handleCheckBox3 message :', message)
    }
    
    const handleCheckBox4 = (message, event) => {
      console.log('handleCheckBox4 message :', message)
      console.log('handleCheckBox4 event :', event)
    }

    return {
      userId,
      userPw,
      introduction,
      developer,
      foreigner,
      hobbyList,
      gender,
      nationality,
      carList,
      onSubmit,
      handleCheckBox,
      handleCheckBox2,
      handleCheckBox3,
      handleCheckBox4,
    }
  },
}
</script>
