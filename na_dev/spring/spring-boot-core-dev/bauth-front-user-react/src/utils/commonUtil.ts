//import { v4 as uuidv4 } from 'uuid';
export * from '@utils/validateUtil';
export * from '@utils/stringUtil';
export * from '@utils/maskUtil';
import { trim } from "lodash";

/**
 * 키 생성(컴포넌트를 관리 하기 위해 키 생성이 필요할 경우)
 * @param suffix 키 뒤에 붙일 문자열
 */
export const createKey = (suffix ?: string): string => {
  const now = new Date();

  const {year, month, day, hours, minutes, seconds, milliseconds} = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    milliseconds: now.getMilliseconds()
  }

  const suffixStr = !!suffix ? `_${suffix}` : '';
  //TODO
  //key에 시간을 붙이고 생성할지 (밀리세컨드를 붙여도 중복이 발생할 가능성이 있고 Math.Random 을 넣어도 중복될 가능성이 있음.)
  //중복을 피하기 위해 uuidv4를 사용할지
  //ex) uuidv4() + suffixStr
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${suffixStr}`;
}

/** 넘버타입으로 변환 */
export const toNumber = (num: string | number) => {
  return Number(num);
}

/** url parameter 추출 */
export const getUrlParam = (paramName: string) => {
  const urlStr:string = location.href;
  const urlObj:URL = new URL(urlStr);
  const urlParam = urlObj.searchParams.get(paramName);

  return urlParam;
}


//값이 공백인지 체크(값이 공백이라면 true 반환)
export const isEmpty = (value:any):boolean => {
  if(value == null || typeof value == undefined || trim(value) == "" || value.length == 0){
      return true;
  }
  return false;
}

export const getCookieValue = (cookieName: string): string | null => {
  const cookies = document.cookie;
  const start = cookies.indexOf(cookieName + '=');
  let cookieValue = null;

  if(start != -1){
    const end = cookies.indexOf(';', start);
    cookieValue = end == -1? cookies.substring(start) : cookies.substring(start, end);
  }
  
  if(cookieValue != null){
    cookieValue = cookieValue.replace(cookieName + '=', '');
  }

  return cookieValue;
}

export const removeCookie = (cookieName: string, path: string = '/'): void => {
  if(isEmpty(getCookieValue(cookieName))){
    return;
  }

  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
}