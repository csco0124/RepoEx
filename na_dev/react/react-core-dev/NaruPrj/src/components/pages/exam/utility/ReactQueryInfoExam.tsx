import { useEffect, useRef, useState } from "react";
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import $api from "../../../../common/CommonAxios";

const ReactQueryInfoExam = () => {
	const queryClient = useQueryClient();	
	const queryCache = queryClient.getQueryCache();

	const [allCache, setAllCache] = useState<string>("");
	const [cacheId, setCacheId] = useState<string>("");
	const [resultData, setResultData] = useState<any>();
	
	useEffect(() => {
		const query = queryCache.findAll();

		let cacheList = "";
		query.forEach(function(item, index) {
			console.log(item["queryKey"], item);
			cacheList += ((index > 0)?",":"")+item["queryKey"];
		});
		setAllCache(cacheList);
		return () => {
		}
	}, []);

	const getCacheData = () => {
		
		//const query = queryCache.find([cacheId])
		const query = queryCache.find([cacheId]);
		console.log(query?.state.data);
		setResultData(JSON.stringify(query?.state.data));
	}
	

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">React-Query 저장정보 조회</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>React-Query 저장정보 조회</li>
        </ul>
      </div>
      <div className="cont-item row">
				<div className="col-4 border">
					현재 저장되어있는 캐시 리스트
					<p className="text-break">{allCache}</p>
				</div>
				<div className="col-4 border">
					<input type="text" onChange={(e) => {setCacheId(e.target.value)}}/>
					<button onClick={getCacheData}>데이터 가져오기</button>
				</div>
				<div className="col-4 border">
					{resultData}
				</div>
				

      </div>
    </div>
  );
};

export default ReactQueryInfoExam;
