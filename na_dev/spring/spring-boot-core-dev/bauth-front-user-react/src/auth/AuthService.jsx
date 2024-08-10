import { $axios } from '@configs/axiosConfig';
import { isEmpty, isMobile } from '@utils/commonUtil';
export class AuthService {
  /**
   * 로그인페이지로 이동
   * */
  static loginPage() {
    // TODO: 상태관리 로그아웃 처리
    location.href = `/?redirect-url=${import.meta.env.VITE_REDIRECT_URL}`;
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
      })
      .catch(error => {
        console.error(error);
        return response.data;
      });

    return authenticated;
  }

  static async logout() {
    if (isMobile() && window.webkit != undefined || window.jsInterface != undefined){
      //sendMessage({action : 'deleteIdPwd'}); // 기기에 저장된 암호 삭제

      //TODO 모바일 브릿지 코드 추가
    }
  }
}