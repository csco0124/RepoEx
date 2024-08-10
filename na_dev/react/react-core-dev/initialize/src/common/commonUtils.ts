export const comm = {
  createKey : (prefix?: string): string => {
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
    const prefixStr = isNotEmpty(prefix) ? `_${prefix}` : '';
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${prefixStr}`;
  }
}


export const isEmpty = (obj: any): boolean => {
  if (typeof obj === 'undefined' || obj === null) return true;
  if (typeof obj === 'string' && obj.trim().length === 0) return true;
  if (Array.isArray(obj)) return isEmpty(obj[0]);
  return typeof obj === 'object' && Object.keys(obj).length === 0;
}

export const isNotEmpty = (obj: any) => {
  return isEmpty(obj);
}