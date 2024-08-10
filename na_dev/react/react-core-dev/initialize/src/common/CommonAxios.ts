import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const setLoadingBlock = (display:boolean) => {
  let loading = window.document.getElementById("loading");
  if(loading && display){
    loading.style.display = "block";
  } else if(loading && !display){
    loading.style.display = "none";
  }
}

const $api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout : import.meta.env.VITE_APP_BACKEND_CALL_TIMEOUT,
  baseURL : import.meta.env.VITE_APP_BACKEND_CALL_URL,
  xsrfCookieName : "XSRF-TOKEN",
  xsrfHeaderName : "X-XSRF-TOKEN",
  withCredentials : true,
});

$api.interceptors.request.use(
  function (config: InternalAxiosRequestConfig<any>) {
    //console.log("[interceptors request] 요청 직전 호출...");
    if(config.headers.isLoading == undefined || config.headers.isLoading === true){
      setLoadingBlock(true);
    } else if (config.headers.isLoading === false) {  // 로딩바를 보여주고 싶지 않으면 axios 헤더에 isLoading: false 를 넣어줌 (예시 : chart.jsx 파일 &api 호출 참조)
      setLoadingBlock(false);
    }
    return config;
  },
  function (error) {
    //console.log("[interceptors request] 요청 에러 처리...");
    setLoadingBlock(false);
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  function (response: AxiosResponse<any, any>) {
    //console.log("[interceptors response] 응답 직후 호출...");
    setLoadingBlock(false);
    return response;
  },
  function (error) {
    //console.log("[interceptors response] 응답 에러 처리...");
    setLoadingBlock(false);
    if(error.code === 'ERR_NETWORK' && import.meta.env.VITE_APP_SERVER !== 'local'){  // Backend 실행되지 않음 등의 에러
      alert("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    }else if (error.code === "ECONNABORTED"){ // axios 타임아웃 등의 에러
      alert("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    }else if(error.response.status == 500){ // 500 에러 처리 (구현 예정)
      alert("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    }else if(error.response.status == 404){ // 404 에러 처리 (구현 예정)
      alert("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    } else { // 그 외 에러 처리 (구현 예정)
      alert("[ErrorCode : " + error.code + "]\nmsg : " + error.message);
    }
    return Promise.reject(error);
  }
);

export default $api;