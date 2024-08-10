import { Cookies } from "react-cookie";

const cookies = new Cookies();

/*
[options]
path : 도메인상에서의 적용범위
maxAge : 유효시간(초단위)
*/
export const setCookie = (cookieName: string, value: string, options?: any) => {
  const target = {path : '/', maxAge : import.meta.env.VITE_APP_COOKIE_MAX_AGE};
  const optionsObj = Object.assign(target, options);
  return cookies.set(cookieName, value, optionsObj);
};

export const getCookie = (cookieName: string) => {
  return cookies.get(cookieName);
};

export const removeCookie = (cookieName: string) => {
  return cookies.remove(cookieName);
};
