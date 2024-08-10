import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	let navigate = useNavigate();
	const loginAction = () => {
		window.localStorage.setItem("userLogin", "true");
		navigate("/");
	}

	const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="content center login">
            <div className="login-content">
                <h2 className="h2-title">로그인</h2>
                <form>
                    <div className="form-login">
                        <div className="form-input success">
                            <input type="text" placeholder="아이디" title="아이디" />
                            <p className="message">
                                ID is a required field
                            </p>
                        </div>
                        <div className="form-input error">
                            <input type={showPassword ? 'text' : 'password'} placeholder="비밀번호" title="비밀번호" />
														<i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} style={{marginLeft:"-35px", cursor:"pointer"}} onClick={() => setShowPassword(!showPassword)}></i>
                            <p className="message">
                                Password is a required field
                            </p>
                        </div>
                    </div>
                    <div className="form-flex-between mtb8">
                        <div className="check-list">
                            <div className="form-check">
                                <input type="checkbox" name="" id="id_check" className="form-check-input" />
                                <label htmlFor="id_check">아이디 저장</label>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn-text">비밀번호 찾기</button>
                        </div>
                    </div>
                    <div className="btn-area">
                        <button type="button" className="btn btn-lg btn-primary" onClick={loginAction}>
                            <span>확인</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login