// import { loginStore } from '@/stores/login';
import { $axios } from '@/configs/axios/axiosConfig';
import { PATH_AUTH } from '@/routes/paths';
export class AuthService {
  /**
   * 로그인페이지로 이동
   * */
  static loginPage() {
    // TODO: 상태관리 로그아웃 처리
    location.href = `/login?redirect-url=${import.meta.env.VITE_REDIRECT_URL}`;
  }

  /**
   * 서버의 세션을 체크하여 로그인 객체가 있는지 확인
   * */
  static async isLogin() {
    const authenticated = await $axios
      .get('cmm/sessionChk', {
        baseURL: '/',
      })
      .then(response => {
        return response.data;
      });

    return authenticated;
  }

  /**@deprecated */
  static async login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const authData = $axios.post('/login', formData, {isSkipError : true})
      .then(res => {
        if (res.data.error === 'OK') {
          localStorage.setItem('email', email);
        }

        return res.data.data;
      });

    return authData;
  }

  static async logout() {
    const formData = new FormData();
    formData.append('redirect-url', PATH_AUTH.login);
    await $axios.post('/logout', formData);
  }
}
