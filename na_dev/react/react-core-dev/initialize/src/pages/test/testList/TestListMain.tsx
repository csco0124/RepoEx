import { Link, NavLink, Outlet } from "react-router-dom";

interface TestJsonData {
  USER: string;
  ADDRESS: string;
};

const buttonStyle = {fontSize:"0.5em"};

function TestListMain() { 
  
  return (
    <div>
      <nav className="navbar navbar-default no-margin" style={{width:"100px", float:"left", borderRight:"dashed red"}}>
        <Link to="/test"><button style={{marginBottom:"20px"}}>Sample/Test 홈으로...</button></Link>
        <NavLink to="/test/testList/ajax" style={buttonStyle} 
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
            Axios Ajax 테스트
        </NavLink>
        <NavLink to="/test/testList/numberCalc" style={buttonStyle}
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
          JS 숫자 계산
        </NavLink>
        <NavLink to="/test/testList/jwt" style={buttonStyle}
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
          JWT 토큰 테스트
        </NavLink>
        <NavLink to="/test/testList/testCookie" style={buttonStyle}
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
          쿠키 테스트
        </NavLink>
        <NavLink to="/test/testList/testRedux" style={buttonStyle} 
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
            리덕스 상태관리 데이터 테스트
        </NavLink>
				<NavLink to="/test/testList/testProgress" style={buttonStyle} 
          className={({ isActive }) => {return isActive ? "btn btn-primary" : "btn";}}
        >
            Bootstrap 프로그레스 바 테스트
        </NavLink>
      </nav>
      <div style={{float:"right", minWidth:"500px"}}>
        <Outlet />
      </div>
    </div>
  );
}

export default TestListMain;