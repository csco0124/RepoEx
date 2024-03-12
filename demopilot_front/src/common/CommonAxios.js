import axios from "axios";

const $api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: import.meta.env.VITE_APP_BACKEND_CALL_TIMEOUT,
  baseURL: import.meta.env.VITE_APP_BACKEND_CALL_URL,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withCredentials: true,
});

$api.interceptors.response.use(
  function (response) {
    //console.log("[interceptors response] 응답 직후 호출...");
    return response;
  },
  function (error) {
    // const mainModalStore = useMainModalStore();
    // if(error.code === 'ERR_NETWORK'){  // OAuth 인증이 안되거나 Backend 실행되지 않음 등의 에러
    //   console.log("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    // 	mainModalStore.openModal();
    // }else if (error.code === "ECONNABORTED"){ // axios 타임아웃 등의 에러
    //   console.log("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    // 	mainModalStore.openInfoModal(error.message);
    // }else if(error.response && error.response.status == 500){ // 500 에러 처리
    //   console.log("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    // 	mainModalStore.openInfoModal(error.message);
    // }else if(error.response && error.response.status == 401){ // 401 에러 처리
    //   console.log("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    // 	loginModalStore.openModal();
    // } else { // 그 외 에러 처리 (구현 예정)
    //   console.log("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    // 	mainModalStore.openInfoModal(error.message);
    // }
    // return error;
  }
);

const $isUserLogin = async () => {
  try {
    const res = await axios.post(
      "/login/autoLogin",
      {},
      {
        headers: { "Content-Type": "application/json" },
        timeout: import.meta.env.VITE_APP_BACKEND_CALL_TIMEOUT,
        baseURL: import.meta.env.VITE_APP_BACKEND_CALL_URL,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export default $api;
export { $isUserLogin };
