import { onlyNumber } from '@utils/stringUtil';

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
