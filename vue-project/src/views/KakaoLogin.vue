<template>
  <div>
    <a id="custom-login-btn" @click="kakaoLogin()">
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="222"
      />
    </a>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      code: "",
    };
  },
  mounted() {
    // Kakao.init('749ee852ff8d08a9202a172774492887');
    // Kakao.isInitialized();
    // this.kakaoLogout();
  },
  methods: {
    kakaoLogin() {
      Kakao.Auth.login({
        success: function (authObj) {
          Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              alert(JSON.stringify(res));

              const kakao_account = res.kakao_account;
              const nickname = kakao_account.profile.nickname; //카카오 닉네임
              const email = kakao_account.email; //카카오 이메일

              console.log("nickname", nickname);
              console.log("email", email);
              //로그인 처리 구현

              console.log(kakao_account);

              alert("로그인 성공!");
            },
            fail: function (error) {
              alert(
                "login success, but failed to request user information: " +
                  JSON.stringify(error)
              );
            },
          });
        },
        fail: function (err) {
          alert(JSON.stringify(err));
        },
      });
    },
  },
};
</script>
