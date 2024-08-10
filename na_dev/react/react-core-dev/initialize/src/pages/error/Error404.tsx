import { useLocation, useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h3>404 error...</h3>
      <p>요청 경로(존재하지 않는 경로) : {location.pathname}</p>
      <h3><button onClick={()=>navigate("/")}>홈으로...</button></h3>
    </div>
  );
}

export default Error404;