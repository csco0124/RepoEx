import React from "react";

interface AlertProps {
  children?: any;
  message: string;
  alertType?: string;
  onClose: () => void;
  options?: AlertOptions;
}

interface AlertOptions {
  //position?: POSITIONS; //TODO - 추후 필요하면 정의~
  //duration?: number;
}

const AlertContent = (
  {
    message,
    onClose,
    options,
    children
  } : AlertProps) => {
  return (
    <article className="popup-wrap sm">
      <div className="dim"></div>
      <div className="popup">
        <div className="popup-layout">
          <header className="popup-header">
            <h1 className="popup-title">회원정보 변경</h1>
          </header>
          <div className="popup-content">
            <form>
              <div className="popup-cont">
                <p className="text-info">회원정보 변경을 원하실 경우 본인확인을 위해 비밀번호를 한번 더 입력해주세요.</p>
                <div className="form-itme mt8">
                  <dl>
                    <dt>아이디</dt>
                    <dd>Hanwha@hanwha.com</dd>
                  </dl>
                  <dl>
                    <dt><label htmlFor="pass">비밀번호</label></dt>
                    <dd>
                      <input type="password" id="pass" />
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="btn-area confirm">
                <button type="button" className="btn-sm cancel">
                  <span>취소</span>
                </button>
                <button type="button" className="btn-sm primary">
                  <span>확인</span>
                </button>
              </div>
            </form>
          </div>
          <button type="button" className="popup-close">
            <span>닫기</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default AlertContent;
export type { AlertProps, AlertOptions };