import MenuDepth from "../../../common/MenuDepth";
import ToastContext from "../../../../store/toast-context";
import {
  addComma,
  addHyphenPhone,
  emailMask,
  isAndroid,
  isBrowser,
  isDate,
  isDev,
  isEmail,
  isEnglish,
  isIOS,
  isLocal,
  isMobile,
  isNumber,
  isPhoneNumber,
  isProd,
  numberMask,
  onlyEng,
  onlyEngNum,
  onlyHangul,
  onlyNumber,
  phoneNumberMask,
} from "../../../../common/commonUtil";
import {useContext, useState} from "react";

/**
 * input Event 에서 한글 입력시 이벤트 2번 실행이 되는 이슈가 있음
 * 참조 : https://junhyunny.github.io/react/typescript/korean-keyboard-event-error/
 */
const ExamCommonUtils = () => {
  const commToast = useContext(ToastContext);

  const [inputs, setInputs] = useState({
    onlyNumberValue: "",
    onlyHangulValue: "",
    addCommaValue: "",
    onlyEngValue: "",
    addHyphenValue: "",
    onlyEngNumValue: "",
    phoneNumberMaskValue: "",
    emailMaskValue: "",
    numberMaskValue: ""
  });

  const {
    onlyNumberValue,
    onlyHangulValue,
    addCommaValue,
    onlyEngValue,
    addHyphenValue,
    onlyEngNumValue,
    phoneNumberMaskValue,
    emailMaskValue,
    numberMaskValue
  } = inputs;

  const numberValidHandle = (e: any) => {
    if (isNumber(e.target.value)) {
      commToast.call('숫자 검증 완료');
    } else {
      commToast.warn('숫자 검증 실패 숫자만 입력 가능');
    }
  }

  const dateValidHandle = (e: any) => {
    if (isDate(e.target.value)) {
      commToast.call('날짜 검증 완료');
    } else {
      commToast.warn('숫자 검증 실패 YYYYMMDD 형식으로 입력해주세요.');
    }
  }

  const emailValidHandle = (e: any) => {
    if (isEmail(e.target.value)) {
      commToast.call('이메일 검증 완료');
    } else {
      commToast.warn('이메일 검증 실패 이메일 형식으로 입력해주세요.');
    }
  }

  const engValidHandle = (e: any) => {
    if (isEnglish(e.target.value)) {
      commToast.call('영문 검증 완료');
    } else {
      commToast.warn('영문 검증 실패 영문만 입력 가능');
    }
  }

  const phoneValidHandle = (e: any) => {
    if (isPhoneNumber(e.target.value)) {
      commToast.call('핸드폰번호 검증 완료');
    } else {
      commToast.warn('핸드폰번호 검증 실패 핸드폰 형식으로 입력해주세요.');
    }
  }

  //input Event 가 아닐 경우 isComposing 의 여부는 체크 X
  //한글 입력시 IME 이슈로 인해 isComposing 으로 체크를 해야함
  //isCOmposing은 한글 입력시 (모음 자음 조합 여부) true 로 들어옴 replace할 경우 기존 value 값이 하나씩 사라지는 이슈가 있어서
  //replace를 하지 않음
  /** 숫자만 입력 */
  const onlyNumberHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : onlyNumber(e.target.value)
    setInputs({ ...inputs, onlyNumberValue: inputValue });
  };

  /** 한글만 입력 */
  const onlyHangulHandle = (e: any) => {
    setInputs({ ...inputs, onlyHangulValue: onlyHangul(e.target.value) });
  }

  /** 콤마 추가 */
  const addCommaHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : addComma(e.target.value)
    setInputs({ ...inputs, addCommaValue: inputValue });
  }

  /** 영문만 입력 */
  const onlyEngHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : onlyEng(e.target.value)
    setInputs({ ...inputs, onlyEngValue: inputValue });
  }

  /** 핸드폰번호 입력 (-) 추가 */
  const addHyphenHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : addHyphenPhone(e.target.value)
    setInputs({ ...inputs, addHyphenValue: inputValue });
  }

  /** 영어와 숫자만 입력 */
  const onlyEngNumHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : onlyEngNum(e.target.value)
    setInputs({ ...inputs, onlyEngNumValue: inputValue });
  }

  /** 핸드폰번호 마스킹 */
  const phoneMaskHandle = (e: any) => {
    const inputValue = e.nativeEvent.isComposing ? e.target.value : phoneNumberMask(e.target.value)
    setInputs({ ...inputs, phoneNumberMaskValue: inputValue });
  }

  /** 이메일 마스킹 */
  const emailMaskHandle = (e: any) => {
    const inputValue = isEmail(e.target.value) ? emailMask(e.target.value) : e.target.value;
    setInputs({ ...inputs, emailMaskValue: inputValue });
  }

  const resetEmailMaskValue = () => {
    setInputs({ ...inputs, emailMaskValue: "" });
  }

  /** 숫자 마스킹 */
  const numberMaskHandle = (e: any) => {
    setInputs({ ...inputs, numberMaskValue: numberMask(e.target.value) });
  }

  const resetNumberMaskValue = () => {
    setInputs({ ...inputs, numberMaskValue: "" });
  }

  const getServerStatus = () => {
    if(isLocal()) {
      return "로컬"
    } else if(isDev()) {
      return "개발"
    } else if(isProd()) {
      return "운영"
    } else {
      return "알수없음"
    }
  }

  return <div className="content">
          <MenuDepth />
          <div className="cont-item">

            <h3 className="h3-title">현재 서버 상태 : {getServerStatus()}</h3>
            <br/>
              <div className="row">
                <div className="col-2">
                  모바일 여부 : {isMobile() ? 'O' : 'X'}
                </div>
                <div className="col-2">
                  브라우저 여부 : {isBrowser() ? 'O' : 'X'}
                </div>
                <div className="col-2">
                  IOS 여부 : {isIOS() ? 'O' : 'X'}
                </div>
                <div className="col-2">
                  Android 여부 : {isAndroid() ? 'O' : 'X'}
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-2">
                  숫자검증 : <input type="text" onChange={numberValidHandle} />
                </div>
                <div className="col-2">
                  날짜검증 : <input type="text" onChange={dateValidHandle} />
                </div>
                <div className="col-2">
                  이메일검증 : <input type="text" onChange={emailValidHandle} />
                </div>
                <div className="col-2">
                  영어검증 : <input type="text" onChange={engValidHandle} />
                </div>
                <div className="col-2">
                  핸드폰번호 검증 <input type="text" onChange={phoneValidHandle} />
                </div>
              </div>

            <br/>
            <h3 className="h3-title">String Util 예시 string replace</h3>
            <br/>
            <div className="row">
              <div className="col-2">
                한글만 입력가능: <input type="text" value={onlyHangulValue} onChange={onlyHangulHandle} />
              </div>
              <div className="col-2">
                콤마추가 (천단위): <input type="text" value={addCommaValue} onChange={addCommaHandle} />
              </div>
              <div className="col-2">
                영문만 입력가능: <input type="test" value={onlyEngValue} onChange={onlyEngHandle} />
              </div>
              <div className="col-2">
                숫자만 입력가능: <input type="text" value={onlyNumberValue} onChange={onlyNumberHandle} />
              </div>
              <div className="col-2">
                핸드폰번호 입력 (-) 추가: <input type="text" className="form-input" value={addHyphenValue} onChange={addHyphenHandle}/>
              </div>
              <div className="col-2">
                영어와 숫자만 입력: <input type="text" value={onlyEngNumValue} onChange={onlyEngNumHandle} />
              </div>
            </div>
            <br/>
            <h3 className="h3-title">Masking Util 예시</h3>
            <br/>
            <div className="row">
              <div className="col-2">
                핸드폰번호 : 010-****-5678
                <input type="text" value={phoneNumberMaskValue} onChange={phoneMaskHandle} />
              </div>
              <div className="col-2">
                이메일 : na***@na***.com
                <input type="text" value={emailMaskValue} onChange={emailMaskHandle} onClick={resetEmailMaskValue} />
              </div>
              <div className="col-2">
                숫자 : 상세주소 등등
                <input type="text" value={numberMaskValue} onChange={numberMaskHandle} onClick={resetNumberMaskValue} />
              </div>
            </div>

          </div>
        </div>
}

export default ExamCommonUtils;