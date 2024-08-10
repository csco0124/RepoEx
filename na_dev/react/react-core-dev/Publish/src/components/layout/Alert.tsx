import { Form } from "react-router-dom"

const Alert = () => {
    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#alert">
            alert/confirm
            </button>

            <div className="modal modal-sm alert fade" id="alert" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p className="text-info fs-6">회원정보 변경을 원하실 경우 본인확인을 위해 비밀번호를 한번 더 입력해주세요.</p>
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

export default Alert