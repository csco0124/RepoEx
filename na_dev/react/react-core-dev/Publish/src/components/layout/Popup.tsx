import { useState } from "react"

const Popup = () => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
            modal-sm
            </button>

            <div className="modal modal-sm fade" id="exampleModal1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel1">회원정보 변경</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className="text-info fs-6">회원정보 변경을 원하실 경우 본인확인을 위해 비밀번호를 한번 더 입력해주세요.</p>
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">취소</button>
                            <button type="button" className="btn btn-sm btn-primary">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup