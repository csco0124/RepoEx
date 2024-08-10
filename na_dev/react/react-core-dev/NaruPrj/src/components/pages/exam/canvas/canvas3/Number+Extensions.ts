
declare global {
  interface Number {
    toHex(): string;
  }
}

Number.prototype.toHex = function (): string {
  function toHexDigit(decimal: number): string {
    if (decimal < 10) {
      return decimal.toString();
    }

    // 10부터는 A~F 문자로 표현
    return String.fromCharCode('A'.charCodeAt(0) + (decimal - 10));
  }

  let decimal = this.valueOf();

  if (decimal === 0) {
    return '0';
  }

  let hex = '';
  while (decimal > 0) {
    const remainder = decimal % 16;
    hex = toHexDigit(remainder) + hex;
    decimal = Math.floor(decimal / 16);
  }
  return hex;
};

export {};
