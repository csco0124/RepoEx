import { useEffect, useRef, useState } from "react";
import { QueryCache, useQuery, useQueryClient } from '@tanstack/react-query';
import $api from "../../../../common/CommonAxios";

const getData = async () => {
	let result:any = await $api.post("api/test/get_test_json_data");
	return result.data;
}
const getDataSleep = async () => {
	let result:any = await $api.post("api/test/get_test_json_data_sleep");
	return result.data;
}
const getDataParam = async (repeatCnt:number) => {
	let paramData = { repeatCnt: repeatCnt };
	let result:any = await $api.post("api/test/get_test_json_data_param", paramData);
	return result.data;
}

const ReactQueryExam = () => {
	const queryClient = useQueryClient();
	
	const input4 = useRef<any>();

	const [resultData1, setResultData1] = useState<JSX.Element>();
	const [resultData2, setResultData2] = useState<JSX.Element>();
	const [resultData3, setResultData3] = useState<JSX.Element>();
	const [resultData4, setResultData4] = useState<JSX.Element>();
	const [resultData5, setResultData5] = useState<any>("");

	const GetQueryData = () => {
    const { data, isLoading, isError } = useQuery<any[]>({queryKey: ["data"], queryFn: getData,}); // param1 : Unique 키, param2 : 비동기 함수
		if (isLoading) return <span>Loading...</span>;

    if (isError) return <span>Error...</span>;
    return (
      <div>
        <ul>
          {data?.map((dataObj) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
      </div>
    );
  };
	
	const GetQueryData2 = () => {
		const { data : data2_1 } = useQuery<any[]>({queryKey: ["data2"], queryFn: getDataSleep,});
		const { data : data2_2 } = useQuery<any[]>({queryKey: ["data3"], queryFn: getDataSleep, enabled: !!data2_1});
		
    return (
      <div>
        <ul>
          {data2_1 && data2_1?.map((dataObj:any) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
				<ul>
          {data2_2 && data2_2.map((dataObj:any) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
      </div>
    );
	}

	const GetQueryData3 = () => {
		const { data : data3_1 } = useQuery<any[]>({queryKey: ["data3_1"], queryFn: getDataSleep,});
		const { data : data3_2 } = useQuery<any[]>({queryKey: ["data3_2"], queryFn: getDataSleep, enabled: !!data3_1});
		
    return (
      <div>
        <ul>
          {data3_1 && data3_1?.map((dataObj:any) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
				<ul>
          {data3_2 && data3_2.map((dataObj:any) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
      </div>
    );
	}
	const GetQueryData4 = ({repeatCnt}:any) => {
		const { data : data4 } = useQuery<any[]>({queryKey: ["data4"], queryFn: () => getDataParam(repeatCnt)});
		
    return (
      <div>
        <ul>
          {data4 && data4?.map((dataObj:any) => (
            <li key={dataObj.USER}>
              {dataObj.USER} | {dataObj.ADDRESS}
            </li>
          ))}
        </ul>
      </div>
    );
	}

	const getData1Clear = () => {
		setResultData1(<></>);
	}
	const getData1 = () => {
		setResultData1(<GetQueryData />);
	}
	const getData2Clear = () => {
		setResultData2(<></>);
	}
	const getData2 = () => {
		setResultData2(<GetQueryData2 />);
	}
	const getData3Clear = () => {
		setResultData3(<></>);
		queryClient.clear();
	}
	const getData3 = () => {
		setResultData3(<GetQueryData3 />);
	}
	const getData4Clear = () => {
		setResultData4(<></>);
	}
	const getData4 = () => {
		const repeatCnt:any = input4.current?.value;
		setResultData4(<GetQueryData4 repeatCnt={repeatCnt} />);
	}

	const getData5 = () => {
		const queryCache = queryClient.getQueryCache();
		const query = queryCache.findAll();
		console.log(query);

		let queryList = "";

		query.forEach(function(item, index) {
			console.log(item["queryKey"]);
			queryList += ((index > 0)?",":"")+item["queryKey"];
		});
		
		setResultData5(queryList);
	}

	useEffect(() => {
		
		return () => {
		}
	}, []);

	

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">React-Query 예제</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>React-Query</li>
        </ul>
      </div>
      <div className="cont-item row">
				
				<div className="col-4 border" style={{minHeight:"100px"}}>
					<h3>일반적인 react-query ajax 호출</h3>
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData1}>일반 실행</button>&nbsp;
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData1Clear}>Clear</button>
					{resultData1}
				</div>

        <div className="col-4 border" style={{minHeight:"100px"}}>
					<h3>2개 ajax를 동기화로 호출(두번째 실행시부터 캐시에 있는 데이터가 출력됨)</h3>
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData2}>동기적 실행</button>&nbsp;
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData2Clear}>Clear</button>
					{resultData2}
				</div>

				<div className="col-4 border" style={{minHeight:"100px"}}>
					<h3>2개 ajax를 동기화로 호출(캐시삭제 기능이 있어 두번이상 실행시에도 동일하게 수행됨)</h3>
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData3}>동기적 실행</button>&nbsp;
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData3Clear}>Clear(캐시삭제)</button>
					{resultData3}
				</div>

				<div className="col-4 border" style={{minHeight:"100px"}}>
					<h3>원하는 갯수만큼 호출(파라미터 전달 예시)</h3>
					<input type="number" placeholder="호출 수 (숫자만 입력)" ref={input4} />
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData4}>동기적 실행</button>&nbsp;
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData4Clear}>Clear</button>
					{resultData4}
				</div>

				<div className="col-4 border" style={{minHeight:"100px"}}>
					<h3>저장된 Cache 리스트 확인</h3>
					<button type="button" className="btn btn-sm btn-outline-primary" onClick={getData5}>확인</button>&nbsp;
					<br/>
					{resultData5}
				</div>
				
				

      </div>
    </div>
  );
};

export default ReactQueryExam;
