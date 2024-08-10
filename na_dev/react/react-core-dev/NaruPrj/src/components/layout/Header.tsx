import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import memberImg from '../../resources/images/member/sample.png';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';

function menuActive() {
    const wrap = document.querySelector('.wrap') as HTMLVideoElement;
    if (!wrap.classList.contains('active')){
        wrap.classList.add('active');
    } else {
        wrap.classList.remove('active');
    };
};
function Header() {
	const leftMenuState = useSelector((state: RootState) => state.leftTree);
    const dispatch = useDispatch();
	const location = useLocation();

    const [type, setType] = useState("");

    useEffect(()=>{
        if(window.localStorage.getItem("menuTreeType") === null) {
            window.localStorage.setItem("menuTreeType","5");
        }
        setTreeTypeSession();
    },[])

    useEffect(()=>{
        setTreeTypeSession();
    }, [type])

	useEffect(() => {
        console.log("textarray",leftMenuState.textArray);
    }, [location]);

    const setTreeTypeSession = () => {
        //gnb 하단에 활성화 되있는 요소가 무엇이냐에 따라 세션 값 세팅
        switch(type){
            case "5":
                window.localStorage.setItem("menuTreeType", "5");
                break;
            case "6":
                window.localStorage.setItem("menuTreeType", "6");
                break;
            case "7":
                window.localStorage.setItem("menuTreeType", "7");
                break;
        }
    }

    return (
        <header className="header">
            <div className="head-item">
                <button className="navi-btn" onClick={menuActive}>
                    <div>
                        메뉴
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <nav>
                    <ul className="gnb" id="gnb">
                        {/* <li>
                            <NavLink to="./AdminInfoMgt" onClick={()=>{setType("5")}} className={({ isActive }) => {return (isActive || "5" === window.localStorage.getItem("menuTreeType") || "" === window.localStorage.getItem("menuTreeType")) ? "active" : "";}}>
                                NEXT LAB 통합관리자
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="./DashBoardCbMgt" onClick={()=>{setType("6")}} className={({ isActive }) => {return (isActive || "6" === window.localStorage.getItem("menuTreeType")) ? "active" : "";}}>
                                NEXT LAB 대시보드
                            </NavLink>
                        </li> */}
												<li>
                            <NavLink to="./DemoMgt" onClick={()=>{setType("7")}} className={({ isActive }) => {return (isActive || "7" === window.localStorage.getItem("menuTreeType")) ? "active" : "";}}>
                                DEMO
                            </NavLink>
                        </li>
                        {/* <li>
                            <Link to="./page03" className="">
                                GA모바일위촉
                            </Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div className="head-item">
                <div className="head-btn">
                    {/* <button className="btn-push">알람</button> */}
										<div className="btn btn-light px-2 py-1" onClick={() => {window.location.href = `${import.meta.env.VITE_APP_BACKEND_CALL_URL}/logout`}}>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
												<path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
												<path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
											</svg>
										</div>
										
                    <div className="head-login-item">
                        <dl>
                            <dt>
                                <i>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask07613194" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                      <path d="M20 0H0V20H20V0Z" fill="white"/>
                                    </mask>
                                    <g mask="url(#mask07613194)">
                                      <path d="M10.1739 10.6C5.59894 10.6 1.81694 12.921 1.76794 15.843V16.703C1.8253 16.9253 1.96338 17.1183 2.15527 17.2444C2.34716 17.3705 2.57912 17.4206 2.80594 17.385H17.3619C17.5891 17.4202 17.8213 17.3696 18.0132 17.243C18.2051 17.1163 18.343 16.9228 18.3999 16.7V15.837C18.3529 12.979 14.6569 10.628 10.1699 10.597" fill="white"/>
                                      <path d="M9.98894 9.062H9.99494C10.7985 9.0612 11.569 8.74131 12.1368 8.17265C12.7046 7.60399 13.0233 6.83311 13.0229 6.0295C13.0225 5.22589 12.703 4.45533 12.1346 3.88723C11.5663 3.31913 10.7955 3 9.99194 3C9.18833 3 8.41761 3.31913 7.84923 3.88723C7.28085 4.45533 6.96134 5.22589 6.96094 6.0295C6.96054 6.83311 7.27929 7.60399 7.84711 8.17265C8.41492 8.74131 9.18533 9.0612 9.98894 9.062Z" fill="white"/>
                                    </g>
                                  </svg>
                                </i>
                                <div>
                                    <strong>이름</strong>
                                    <span>info@naruint.com</span>
                                </div>
                            </dt>
                            <dt>
                                <i>
                                    <img src={memberImg} alt="사원이미지" />
                                </i>
                                <div>
                                    <strong>김한화</strong>
                                    <span>Hanwha@hanwha.com</span>
                                </div>
                            </dt>
                            <dd className="change-item">
                                <button type="button" className="">회원정보 변경</button>
                                <button type="button" className="">로그아웃</button>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header

