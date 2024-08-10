//import { v4 as uuidv4 } from 'uuid';
export * from '@utils/validateUtil';
export * from '@utils/stringUtil';
export * from '@utils/maskUtil';

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


export const deepCopy = <T>(obj: T): T => {
  // 객체가 아닌 경우에는 그대로 반환
  if (typeof obj !== 'object' || obj === null) {
      return obj;
  }

  // 객체인 경우 새로운 객체 또는 배열 생성
  const copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

  // 객체 또는 배열의 모든 속성/요소에 대해 재귀적으로 깊은 복사 수행
  for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = deepCopy((obj as any)[key]);
      }
  }
  return copy;
}

