import { useState } from 'react';
import { Link } from 'react-router-dom';

type TestJsonData = {
  USER: string;
  ADDRESS: string;
};

function Test() {
  const [count, setCount] = useState<number>(0);
  const [testJsonListData, setTestJsonListData] = useState<Array<TestJsonData>>(
    []
  );

  return (
    <div style={{ width: '300px' }}>
      <div style={{ textAlign: 'center' }}>
        <div>
          <Link to="/">
            <button>홈으로...</button>
          </Link>
          <br />
          <hr />
          <hr />
          <Link to="/test/testList">
            <button>유틸 테스트페이지 이동</button>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/test/treeComplex">
            <button>TreeComplex</button>
          </Link>
        </div>
        <div>
          <Link to="/test/treeVeiwMain">
            <button>React dnd TreeVeiw</button>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/test/MenuTreeDemoMain">
            <button>Menu Tree Demo</button>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/test/agGridSample">
            <button>ag-grid Demo</button>
          </Link>
        </div>
        <div>
          <Link to="/test/ReactTableGrid">
            <button>문병윤 ReactTableGrid</button>
          </Link>
          <Link to="/test/PjsTest">
            <button>pjs</button>
          </Link>
          <Link to="/test/test_PjsTest">
            <button>test-pjs</button>
            <Link to="/test/ReactTableTest">
              <button>호진 grid</button>
            </Link>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/test/chartjs">
            <button>ChartJS 속도 테스트</button>
          </Link>
          <br />
          <Link to="/test/chartjsCustom">
            <button>ChartJS 예제</button>
          </Link>
          <br />
          <Link to="/test/chartjsUserCustom">
            <button>사용자정의 ChartJS</button>
          </Link>
          <hr />
          <Link to="/test/nivo">
            <button>nivo차트 속도 테스트</button>
          </Link>
          <br />
          <Link to="/test/nivoUserCustom">
            <button>nivo차트 예제</button>
          </Link>
          <br />
          <Link to="/test/nivoUserCustomGeo">
            <button>nivo 지도 예제</button>
          </Link>
        </div>
        <hr />
        <div>
          <Link to="/test/reactGridLayout">
            <button>react-grid-layout Test</button>
          </Link>
          <br />
          <Link to="/test/reactGridLayoutRandomChart">
            <button>react-grid-layout Chart Exam</button>
          </Link>
          <br />
          <Link to="/test/reactGridLayoutCustom">
            <button>react-grid-layout Custom</button>
          </Link>
          <br />
          {/* <br />
          <Link to="/test/reactGridLayoutAddRemove">
            <button>react-grid-layout Add and Remove</button>
          </Link>
          <br />
          <Link to="/test/reactGridLayoutAddRemove2">
            <button>react-grid-layout Add and Remove2</button>
          </Link> */}
        </div>
				<hr />
        <div>
				<Link to="/test/reactQueryExam">
            <button>react-query example</button>
          </Link>
				</div>
      </div>
    </div>
  );
}

export default Test;
