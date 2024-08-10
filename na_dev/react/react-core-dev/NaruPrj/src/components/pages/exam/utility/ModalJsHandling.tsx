import { useEffect, useState } from "react";
import * as bootstrapObj from "bootstrap"
import ChartModal from "./modal/ChartModal";

const ModalJsHandling = () => {
	const [modelObj, setModelObj] = useState<any>();

	useEffect(() => {

		let chartModal1:any = document.getElementById('chartModal1');
		let myModal = new bootstrapObj.Modal(chartModal1);
		setModelObj(myModal);

    return () => {
      console.log('다른 컴포넌트로 전환');
    };
  }, []);

	const openChartModel = () => {
		modelObj.show();
	}

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">Modal JS Control</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>Modal JS Control</li>
        </ul>
      </div>
      <div className="cont-item">
				<div className="title-item">
          <h3 className="h3-title">Modal창을 자바스크립트로 컨르롤하는 예제</h3>
        </div>
				<div className="title-item">
          <h5 className="h5-title">Modal창에 데이터를 Props로 넘기거나 받을때, 자바스크립트로 Modal 창을 제어하는 경우가 생길 수 있으므로, 이런 경우에 대비하여 만든 예제</h5>
        </div>
				<div className="title-item" style={{marginTop:"10px"}}>
					<a href="https://getbootstrap.com/docs/5.0/components/modal/#via-javascript" target="blank_">
						<button type="button" className="btn btn-secondary">참조 사이트(클릭)</button>
					</a>
        </div>
				
				<div className="title-item" style={{marginTop:"30px"}}>
					<button type="button" className="btn btn-primary" data-bs-target="#chartModal1" onClick={openChartModel} >Open Modal</button>
        </div>
      </div>

			<ChartModal data={"data1"} modelObj={modelObj} />

    </div>
  );
};

export default ModalJsHandling;
