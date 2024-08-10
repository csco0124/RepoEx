import { Form } from "react-router-dom"

const Toast = () => {
    return (
        <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    <p className="text-check">Hello, world! This is a toast message.Hello, world! This is a toast message.Hello, world! This is a toast message.</p>
                    <p className="text-warning">토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄 토스트 내용 두줄</p>
                </div>
                <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    )
}

export default Toast