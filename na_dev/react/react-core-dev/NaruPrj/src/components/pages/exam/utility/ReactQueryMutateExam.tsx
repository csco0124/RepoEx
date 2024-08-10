import { useEffect, useRef, useState } from "react";
import $api from "../../../../common/CommonAxios";
import ReactQueryMutateExamChild from "./ReactQueryMutateExamChild";

const ReactQueryMutateExam = () => {
	

	useEffect(() => {
		
		return () => {
		}
	}, []);

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">React-Query Mutate 예제</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>React-Query-mutate</li>
        </ul>
      </div>
      <div className="cont-item">
				<ReactQueryMutateExamChild post={{id:"ID", title:"title"}} />
      </div>
    </div>
  );
};

export default ReactQueryMutateExam;
