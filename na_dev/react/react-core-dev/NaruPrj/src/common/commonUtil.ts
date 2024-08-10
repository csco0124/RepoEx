import date from 'date-and-time';
import {
  isAndroid as _isAndroid,
  isBrowser as _isBrowser,
  isIOS as _isIOS,
  isMobile as _isMobile
} from "react-device-detect";
import axios, {HttpStatusCode} from "axios";

/**=======================================공통 유틸 목록=======================================
 * 함수의 isNot은 반대로 동작한다.
 * createKey: 키 생성(컴포넌트를 관리 하기 위해 키 생성이 필요할 경우)
 * isEmpty: 객체가 비어있는지 확인
 * isNotEmpty: 객체가 비어있지 않은지 확인
 * isLocal: 로컬 서버 여부
 * isDev: 개발 서버 여부
 * isProd: 운영 서버 여부
 * isMobile: 모바일 여부
 * isAndroid: 안드로이드 여부
 * isIOS: IOS 여부
 * isBrowser: 브라우저 여부
 * isDate: 날짜 여부
 * isNumber: 숫자 여부
 * isEnglish: 영어 여부
 * isHangul: 한글 여부
 * isEmail: 이메일 여부
 * isPhone: 전화번호 여부
 * isPathName: urlPath 여부 location.pathname 이 맞는지에 대한 여부
 * isHttpStatus: http 상태코드 여부
 * getBytes: 문자열 바이트 수 구하기
 * isBirthDate: 생년월일 여부
 * addComma: 숫자에 콤마 추가
 * addHyphenPhone: 전화번호 하이픈 추가
 * onlyNumber: 숫자만 남기고 제거
 * onlyHangul: 한글만 남기고 제거
 * onlyEng: 영어만 남기고 제거
 * onlyEngNum: 영어, 숫자만 남기고 제거
 * phoneNumberMask: 전화번호 마스킹
 * emailMask: 이메일 마스킹
 * numberMask: 숫자 마스킹(상세 주소 등)
 * getInsuAge: 보험나이를 구한다.
 * getRealAge: 만나이를 구한다.
 * getCbtDate: 상령일을 구한다
 * getSex: 성별을 구한다.
 * getSexText: 성별문구를 구한다
 * getBirthDateByRgno: 주민번호로 생년월일을 구한다.
 * extractBirthDate: 생년월일 추출
 *=========================================================================================*/

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

  const suffixStr = isNotEmpty(suffix) ? `_${suffix}` : '';
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${suffixStr}`;
}

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
  return import.meta.env.VITE_APP_SERVER === 'local';
}

/** 개발 서버 여부 */
export const isDev = (): boolean => {
  return import.meta.env.VITE_APP_SERVER === 'dev';
}

/** 운영 서버 여부 */
export const isProd = (): boolean => {
  return import.meta.env.VITE_APP_SERVER === 'production';
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

/** 날짜 여부 */
export const isDate = (dateStr: string): boolean => {
  return date.isValid(dateStr, 'YYYYMMDD');
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
  if (isEmpty(status)) return false;
  try { status = toNumber(status); }
  catch { return false; }
  return Object.values(HttpStatusCode).includes(status);
}

/** 문자열의 길이 반환 */
export const getBytes = (str: string): number => {
  let byte = 0;
  for (let i = 0; i < str.length; i++) {
    byte += str.charCodeAt(i) > 128 ? 2 : 1;
  }
  return byte;
}

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

/** 넘버타입으로 변환 */
export const toNumber = (num: string | number) => {
  return Number(num);
}

/**
 * 전화번호 마스킹
 * @param phone
 * ex) 01012345678 -> 010-****-5678
 */
export const phoneNumberMask = (phone: string): string => {
  const phoneNumber = onlyNumber(phone?.toString());
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
}

/**
 * 이메일 마스킹
 * @param email
 * ex)narui@naruint.com -> na****@na****.com
 */
export const emailMask = (email: string): string => {
  const [id, domain] = email.split('@');
  const idLength = id.length;
  const idMask = idLength > 2 ? id.substring(0, 2) + '*'.repeat(idLength - 2) : id;
  const domainMask = domain.split('.').map((v, i) => {
    if (i === 0) {
      return v.length > 1 ? v.substring(0, 2) + '*'.repeat(v.length - 2) : v
    }
    return v;
  }).join('.');
  return `${idMask}@${domainMask}`;
}

/**
 * 숫자 마스킹(상세 주소 등)
 */
export const numberMask = (num: string): string => {
  return num.replace(/\d/g, '*');
}


/**
 * 보험나이를 구한다.
 * @param {string} birthDate - 생년월일 (YYYYMMDD)
 * @param {string} baseDate - 기준일자 (default: 오늘날짜, format: YYYYMMDD)
 * @returns 보험나이
 */
export const getInsuAge = (birthDate: string, baseDate?: string): string => {
  if (!baseDate) baseDate = date.format(new Date(), 'YYYYMMDD');

  let [baseYear, baseMonth, baseDay] = extractBirthDate(baseDate);
  const [birthYear, birthMonth, birthDay] = extractBirthDate(birthDate);

  let datechk = false;

  if (((baseMonth === 1 || baseMonth === 3 || baseMonth === 5 || baseMonth === 7 ||
      baseMonth === 8 || baseMonth === 10 || baseMonth === 12) && baseDay === 31)
    || ((baseMonth === 4 || baseMonth === 6 || baseMonth === 9 || baseMonth === 11) && baseDay === 30)
    || (baseMonth === 2 && (baseDay === 28 || baseDay === 29))){
    datechk = true;

  }

  if ((baseDay - birthDay) < 0 && !datechk) {
    baseMonth--;
  }

  let calmm = baseMonth - birthMonth;
  if ((baseMonth - birthMonth) < 0) {
    baseYear--;
    calmm += 12;
  }

  let calyy = baseYear - birthYear;

  if (calmm > 5) {
    calyy++;
  }

  return String(calyy);
}

/**
 * 만나이를 구한다.
 * @param {string} birthDate - 생년월일 (YYYYMMDD)
 * @param {string} baseDate - 기준일자 (default: 오늘날짜, format: YYYYMMDD)
 * @returns 만나이
 */
export const getRealAge = (birthDate: string, baseDate?: string): string => {
  if (!baseDate) baseDate = date.format(new Date(), 'YYYYMMDD');

  const [baseYear, baseMonth, baseDay] = extractBirthDate(baseDate);
  const [birthYear, birthMonth, birthDay] = extractBirthDate(birthDate);

  let realAge = baseYear - birthYear;

  return String((Number(birthMonth + birthDay) > Number(baseMonth + baseDay) ? --realAge : realAge));
}

/**
 * 상령일을 구한다.
 * @param {string} birthDate - 생년월일 (YYYYMMDD)
 * @param {string} baseDate - 기준일자 (default: 오늘날짜, format: YYYYMMDD)
 * @returns 상령일
 */
export const getCbtDate = (birthDate: string, baseDate?: string): string => {
  if (!baseDate) baseDate = date.format(new Date(), 'YYYYMMDD');

  if (date.isValid(birthDate, 'YYYYMMDD')) throw new Error('생년월일 is invalid.');
  if (date.isValid(baseDate, 'YYYYMMDD')) throw new Error('기준일자 is invalid.');

  const insuAge = Number(getInsuAge(birthDate, baseDate));
  const _birthDate = date.parse(birthDate, 'YYYYMMDD');

  return date.format(date.addMonths(_birthDate, insuAge * 12 + 6), 'YYYYMMDD');
}

/**
 * 성별을 구한다.
 * @param {string} rgno - 주민등록번호
 * @returns - 성별 (1: 남자, 2: 여자) TODO: 리턴 데이터 정의
 */
export const getSex = (rgno: string) => {
  if (date.isValid(rgno, 'YYYYMMDD')) throw new Error('주민등록번호 is invalid.');
  return Number(rgno.charAt(6)) % 2 === 0 ? '2' : '1';
}

/**
 * 성별 텍스트를 구한다.
 * @param {string} rgno - 주민등록번호
 * @returns - 성별텍스트
 */
export const getSexText = (rgno: string) => {
  if (date.isValid(rgno, 'YYYYMMDD')) throw new Error('주민등록번호 is invalid.');
  return getSex(rgno) === '1' ? '남자' : '여자';
}

/**
 * 주민등록번호로 생년월일을 구한다.
 * @param {string} rgno - 주민등록번호
 * @param {string} format - 날짜형식 (default: YYYYMMDD)
 * @returns - 생년월일
 */
export const getBirthDateByRgno = (rgno: string, format = 'YYYYMMDD') => {
  if (date.isValid(rgno, 'YYYYMMDD')) throw new Error('주민등록번호 is invalid.');

  const sexCode = rgno.charAt(6);

  if (sexCode === '1' || sexCode === '2' || sexCode === '5' || sexCode === '6') {
    return date.format(date.parse(`19${rgno.substring(0, 6)}`, 'YYYYMMDD'), format);
  } else {
    return date.format(date.parse(`20${rgno.substring(0, 6)}`, 'YYYYMMDD'), format);
  }
}

/**
 * 생년월일을 추출한다.
 * @param dateStr
 */
export const extractBirthDate = (dateStr: string) => {
  if (date.isValid(dateStr, 'YYYYMMDD')) throw new Error('date is invalid.');
  const year = Number(dateStr.substring(0, 4));
  const month = Number(dateStr.substring(4, 6));
  const day = Number(dateStr.substring(6, 8));

  return [year, month, day];
}

export const isUserLogin = async() => {
	const res = await axios.post("/login/autoLogin", {}, {
		headers: {'Content-Type': 'application/json'},
		timeout : import.meta.env.VITE_APP_BACKEND_CALL_TIMEOUT,
		baseURL : import.meta.env.VITE_APP_BACKEND_CALL_URL,
		xsrfCookieName : "XSRF-TOKEN",
		xsrfHeaderName : "X-XSRF-TOKEN",
		withCredentials : true,
	})
	if(res.data.data && res.data.data.attributes.roles && -1 < res.data.data.attributes.roles.indexOf(import.meta.env.VITE_APP_AUTHORITY_NAME)){
		return "Y";	// 로그인 성공
	} else if (res.data.data && res.data.data.attributes.roles && -1 === res.data.data.attributes.roles.indexOf(import.meta.env.VITE_APP_AUTHORITY_NAME)) {
		return "A"; // 로그인은 되었으나 권한 필요
	} else {
		return "F"; // 로그인이 되어있지 않음
	}
}