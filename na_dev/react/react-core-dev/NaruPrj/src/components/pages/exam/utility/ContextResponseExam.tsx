import { useContext, useState } from "react";
import UtilityContext from "../../../../store/UtilityContext";

const ContextResponseExam = () => {
	const [no, setNo] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const value = useContext(UtilityContext);

	const dataChange = () => {
		value?.actions.setNo(no);
		value?.actions.setTitle(title);
	}

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">Context API 예제 결과</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>Context API 예제 결과</li>
        </ul>
      </div>
      <div className="cont-item row">
				<div className="col-4">
					<p className="text-primary h6">Context API Value (Page2)</p>
					no : {value?.state.no}<br/>
					title : {value?.state.title}
				</div>
				<div className="col-4">
				<p className="text-primary h6">Context 저장소 값 변경</p>
					no : <input type="number" style={{width:"100px", marginLeft:"10px"}} value={no} onChange={(e) => {setNo(Number(e.target.value))}} /><br/>
					title : <input type="text" style={{width:"100px"}} value={title} onChange={(e) => {setTitle(e.target.value)}}/><br/><br/>
					<button type="button" onClick={dataChange} className="btn btn-outline-secondary" >Context Store 값 변경</button>
				</div>
				<div className="col-4">

				</div>
			</div>
    </div>
  );
};

export default ContextResponseExam;
