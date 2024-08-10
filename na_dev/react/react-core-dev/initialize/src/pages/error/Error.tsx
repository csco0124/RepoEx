import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>error...</h3>
      <h3><button onClick={()=>navigate("/")}>홈으로...</button></h3>
    </div>
  );
}

export default Error;