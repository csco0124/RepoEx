import { isEmpty } from '@utils/commonUtil';

/** 숫자에 콤마 추가 */
export const addComma = (num: number | string): string => {
  const onlyNum = onlyNumber(num?.toString());
  return onlyNum?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** 전화번호 하이픈 추가 */
export const addHyphenPhone = (phoneNumber: string): string => {
  if (isEmpty(phoneNumber)) return '';
  return onlyNumber(phoneNumber).replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

/** 숫자만 남기고 제거 */
export const onlyNumber = (num: string | number): string => {
  if (isEmpty(num)) return '';
  return num.toString().replace(/\D/g, '');
}

/** 한글만 남기고 제거 */
export const onlyHangul = (str: string): string => {
  if (isEmpty(str)) return '';
  return str.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, '');
}

/** 영어만 남기고 제거 */
export const onlyEng = (str: string): string => {
  if (isEmpty(str)) return '';
  return str.replace(/[^a-zA-Z]/g, '');
}

/** 영어, 숫자만 남기고 제거 */
export const onlyEngNum = (str: string): string => {
  if (isEmpty(str)) return '';
  return str.replace(/[^a-zA-Z]/g, '');
}

/** 문자열의 길이 반환 */
export const getBytes = (str: string): number => {
  let byte = 0;
  for (let i = 0; i < str.length; i++) {
    byte += str.charCodeAt(i) > 128 ? 2 : 1;
  }
  return byte;
}
