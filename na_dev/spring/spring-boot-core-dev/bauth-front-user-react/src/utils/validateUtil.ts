import {
  isAndroid as _isAndroid,
  isBrowser as _isBrowser,
  isIOS as _isIOS,
  isMobile as _isMobile
} from "react-device-detect";
import { HttpStatusCode } from "axios";

/** 객체가 비어있는지 확인 */
export const isEmpty = (obj: any): boolean => {
  if (typeof obj === 'undefined' || obj === null) return true;
  if (typeof obj === 'string' && obj.trim().length === 0) return true;
  if (Array.isArray(obj)) return isEmpty(obj[0]);
  return typeof obj === 'object' && Object.keys(obj).length === 0;
}

/** 객체가 비어있지 않은지 확인 */
export const isNotEmpty = (obj: any): boolean => {
  return !isEmpty(obj);
}

/** 로컬 서버 여부 */
export const isLocal = (): boolean => {
  return import.meta.env.MODE === 'region';
}

/** 개발 서버 여부 */
export const isDev = (): boolean => {
  return import.meta.env.MODE === 'dev';
}

/** 운영 서버 여부 */
export const isProd = (): boolean => {
  return import.meta.env.MODE === 'production';
}

/** 모바일 여부 */
export const isMobile = (): boolean => {
  return _isMobile;
}

/** 안드로이드 여부 */
export const isAndroid = (): boolean => {
  return _isAndroid;
}

/** IOS 여부 */
export const isIOS = (): boolean => {
  return _isIOS;
}

/** 브라우저 여부 */
export const isBrowser = (): boolean => {
  return _isBrowser;
}

/** 숫자 여부 */
export const isNumber = (num: string | number): boolean => {
  if (isEmpty(num)) return false;
  return !isNaN(Number(num));
}

/** 영어 여부 */
export const isEnglish = (str: string): boolean => {
  return /^[a-zA-Z]+$/.test(str);
}

/** 한글 여부 */
export const isHangul = (str: string): boolean => {
  return /^[가-힣]+$/.test(str);
}

/** 이메일 여부 */
export const isEmail = (email: string): boolean => {
  return /^[A-Za-z\d_\.\-]+@[A-Za-z\d\-]+\.[A-Za-z\d\-]+/.test(email);
}

/** 핸드폰 번호 여부 */
export const isPhoneNumber = (phone: string): boolean => {
  return /^01([0|1|6|7|8|9])-?(\d{3,4})-?(\d{4})$/.test(phone);
}

/** urlPath 여부 location.pathname 이 맞는지에 대한 여부
 *  ex)rc.bluetype.co.kr/narui/insurance/health
 *  /narui/insurance/health <-- 이부분
 */
export const isPathName = (path: string): boolean => {
  if (isEmpty(path) || !path.startsWith('/') || path.endsWith('/') ) return false;
  const reg = /^([a-zA-Z0-9]{1})([a-zA-Z0-9\-_]*?([a-zA-Z0-9]{1}))?$/
  return path.split('/')
             .filter(v => isNotEmpty(v))
             .every(v => reg.test(v));
}

/** http status 여부 */
export const isHttpStatus = (status: number | string): boolean => {
  if (isEmpty(status) || !isNumber(status)) return false;
  return Object.values(HttpStatusCode).includes(Number(status));
}
