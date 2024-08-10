import useSWR from 'swr'
import useCurrentStore, { TEST_SWR_BACK_DATA_STORE_KEY, TEST_SWR_BASIC_BACK_DATA_STORE_KEY, TEST_SWR_FRONT_DATA_STORE_KEY } from "./ReactSWRStore";
import ReactSWRDataList from './ReactSWRDataList';
import $api from '../../../../common/CommonAxios';
import { useEffect, useState } from 'react';


const ReactSWRResultExam = () => {
	const { data } = useSWR<any>(TEST_SWR_BASIC_BACK_DATA_STORE_KEY);
	const { data: frontCurrentStore } = useSWR<any>(TEST_SWR_FRONT_DATA_STORE_KEY);
	const { data: backCurrentStore } = useSWR<any>(TEST_SWR_BACK_DATA_STORE_KEY);

	const { setFrontCurrentStore, clearFrontCurrentStore, setBackCurrentStore, clearBackCurrentStore } = useCurrentStore();

	const [frontData, setFrontData] = useState<string>("");

	useEffect(() => {
		setFrontData(frontCurrentStore);
		return () => {
		}
	}, []);

	const setSwrBackData = async () => {
		let result:any = await $api.post('/api/test/get_test_json_random_data_sleep');
		setBackCurrentStore(result.data);
	}

	const setSwrFrontData = () => {
		setFrontCurrentStore(frontData);
	}
	
  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">SWR 사용법(page2)</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>SWR 사용법 데이터 가져오기</li>
        </ul>
      </div>
      <div className="cont-item row">
				<div className='col-12'>
					<p className='h6'>Backend 데이터 리스트(기본) 데이터 가져오기</p>
				</div>
				<div className='col-6'>
					<ReactSWRDataList data={data} />
				</div>
				<div className='col-12 border m-3'></div>

				<div className='col-12'>
					<p className='h6'>Backend 데이터 리스트(다른 페이지에서도 데이터 수정이 가능한 로직)</p>
				</div>
				<div className='col-6'>
					{backCurrentStore ? <ReactSWRDataList data={backCurrentStore} /> : "Empty Data"}
				</div>
				<div className='col-6'>
					<button className="btn btn-outline-secondary mb-1" onClick={setSwrBackData}>데이터 Set</button><br/>
					<button className="btn btn-outline-danger" onClick={clearBackCurrentStore}>데이터 Clear</button>
				</div>

				<div className='col-12 border m-3'></div>
				<div className='col-12'>
					<p className='h6'>Frontend 데이터 조회/변경</p>
				</div>
				<div className='col-3'>
					<input type="text" onChange={(e) => setFrontData(e.target.value)}  value={frontData} />
					<button className="btn btn-outline-secondary" onClick={setSwrFrontData}>SWR 적용</button>
					
				</div>
				<div className='col-3'>
					SWR 저장소값 : {frontCurrentStore}
				</div>
      </div>
    </div>
  );
};

export default ReactSWRResultExam;
