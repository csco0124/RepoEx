import { useState } from 'react';
import { Link } from 'react-router-dom';
import $api from '../../../../../common/CommonAxios';
import './StartPageStyle.css';
import MenuDepth from '../../../../common/MenuDepth';

const StartPage = () => {
  /**
   * state 정의
   */
  const [searchData, setSearchData] = useState(''); // 검색창에 입력한 값
  const [resultData, setResultData]: any = useState(''); // 입력한 검색 값에서 도출된 데이터
  /**
   * 검색창에 입력한 값 데이터 셋팅
   */
  const searchValueSet = (event: any) => setSearchData(event.target.value); // prettier-ignore

  /**
   * 'search' 버튼 누를 시 해당 기입값에 해당하는 데이터 추출 및 페이지 이동
   */
  const searchDataPath = async () => {
    let res = await $api.get('/api/mby/mocha' + searchData);
    let dataPath = res.data.dataPath;
    let jsonData = res.data.jsonData;
    let dataInfo = res.data.dataInfo;
    let statusCode = res.data.statusCode;
    let delayTime = res.data.delayTime;
    let methodType = res.data.methodType;

    let resultData: any = {
      dataPath,
      jsonData,
      dataInfo,
      statusCode,
      delayTime,
      methodType,
    };
    setResultData(resultData);
  };

  /**
   * 데이터 입력 여부에 따른 'search' 버튼 disable 처리
   */
  const dataValidation: any = () => {
    return searchData.trim() !== '';
  };

  return (
    <div className="content">
      <MenuDepth />
      <div className="cont-item">
        <div className="title-item">
          <h3 className="h3-title">API-MOCHA</h3>
        </div>
        <div className="cont-flex">
          <div className="flex2">
            <input
              type="text"
              placeholder="데이터 경로를 입력해주세요. (예 : /test1)"
              onChange={searchValueSet}
            />
          </div>
          <div className="flex1">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={searchDataPath}
              disabled={!dataValidation()}
            >
              search
            </button>
          </div>
        </div>
        <div className="form-itme mt-4">
          <dl>
            <dt>입력된 데이터 경로</dt>
            <dd>{resultData['dataPath']}</dd>
          </dl>
          <dl>
            <dt>해당 경로의 JSON 데이터</dt>
            <dd>{resultData['jsonData']}</dd>
          </dl>
        </div>
      </div>
      <div className="btn-area one">
        <Link to="/ReactTableGrid">
          <button type="button" className="btn btn-lg btn-primary">
            데이터 경로 확인 및 목록 추가하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
