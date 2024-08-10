import { Routes, Route } from 'react-router-dom';
import './css/loading.css';
import Layout from './components/Layout';
import TestLayout from './components/TestLayout';
import Home from './Home';
import Test from './pages/test/Test';
import TestListMain from './pages/test/testList/TestListMain';
import Chartjs from './pages/test/chartjs/Chartjs';
import ChartjsCustom from './pages/test/chartjs/ChartjsCustom';
import ChartjsUserCustom from './pages/test/chartjs/ChartjsUserCustom';
import Nivo from './pages/test/nivoChart/Nivo';
import NivoUserCustom from './pages/test/nivoChart/NivoUserCustom';
import TestNumberCalc from './pages/test/testList/TestNumberCalc';
import TestJwt from './pages/test/testList/TestJwt';
import TestAjax from './pages/test/testList/TestAjax';
import TestCookie from './pages/test/testList/TestCookie';
import AgGridSample from './pages/test/gridDemo/agGrid/AgGridSample';
import TreeComplex from './pages/test/treeDemo/TreeComplex';
import MenuTreeDemoMain from './pages/test/menuTreeDemo/MenuTreeDemoMain';
import TestRedux from './pages/test/testList/TestRedux';
import TestReduxResult from './pages/test/testList/TestReduxResult';
import Error404 from './pages/error/Error404';
import Error500 from './pages/error/Error500';
import Error from './pages/error/Error';
import TreeVeiw from './pages/test/menu-tree/TreeVeiw';
import ReactTableGrid from './pages/test/gridDemo/byungYoon/ReactTableGrid';
//import PjsTest from './pages/test/gridDemo/pjsTest/PjsTest';
import ReactTableSample from './pages/test/gridDemo/tabulator/ReactTableSample';
import NivoUserCustomGeo from './pages/test/nivoChart/NivoUserCustomGeo';
import ReactGridLayout from './pages/test/reactGridLayout/ReactGridLayout';
import ReactGridLayoutCustom from './pages/test/reactGridLayout/ReactGridLayoutCustom';
import ReactGridLayoutRandomChart from './pages/test/reactGridLayout/ReactGridLayoutRandomChart';
import ReactGridLayoutAddRemove from './pages/test/reactGridLayout/ReactGridLayoutAddRemove';
import ReactGridLayoutAddRemove2 from './pages/test/reactGridLayout/ReactGridLayoutAddRemove2';
import ReactTableTest from './pages/test/gridDemo/HojinTest/ReactTableTest';
import TestProgress from './pages/test/testList/TestProgress';
import ReactQueryExam from './pages/test/ReactQueryExam';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        {/* ------------------ TEST 및 Sample 페이지 ------------------ */}
        <Route path="/test" element={<TestLayout />}>
          <Route index element={<Test />} />
          <Route path="testList" element={<TestListMain />}>
            <Route path="ajax" element={<TestAjax />} />
            <Route path="numberCalc" element={<TestNumberCalc />} />
            <Route path="jwt" element={<TestJwt />} />
            <Route path="testCookie" element={<TestCookie />} />
            <Route path="testRedux" element={<TestRedux />} />
            <Route path="testReduxResult" element={<TestReduxResult />} />
						<Route path="testProgress" element={<TestProgress />} />
          </Route>
					<Route path="reactQueryExam" element={<ReactQueryExam />} />

          {/* 트리 데모 라우트 추가 START */}
          <Route path="treeComplex" element={<TreeComplex />} />
          <Route path="treeVeiwMain" element={<TreeVeiw />} />
          <Route path="MenuTreeDemoMain" element={<MenuTreeDemoMain />}>
            <Route
              path="/test/MenuTreeDemoMain/adminIpMgt"
              element={<TreeComplex />}
            />
            <Route
              path="/test/MenuTreeDemoMain/adminInfoMgt"
              element={<TreeVeiw />}
            />
            <Route
              path="/test/MenuTreeDemoMain/adminAccessHistoryMgt"
              element={<AgGridSample />}
            />
            <Route
              path="/test/MenuTreeDemoMain/adminMgt"
              element={<ReactTableGrid />}
            />
            <Route
              path="/test/MenuTreeDemoMain/adminMenuMgt"
              element={<Chartjs />}
            />
            <Route
              path="/test/MenuTreeDemoMain/adminPageMgt"
              element={<Nivo />}
            />
          </Route>
          {/* 트리 데모 라우트 추가 END */}

          {/* 그리드 데모 라우트 추가 START */}
          <Route path="agGridSample" element={<AgGridSample />} />
          <Route path="ReactTableGrid" element={<ReactTableGrid />} />
          {/* <Route path="PjsTest" element={<PjsTest />} /> */}
          <Route path="test_PjsTest" element={<ReactTableSample />} />
          <Route path="ReactTableTest" element={<ReactTableTest />} />
          {/* 그리드 데모 라우트 추가 END */}

          {/* 차트 데모 라우트 추가 START */}
          <Route path="chartjs" element={<Chartjs />} />
          <Route path="chartjsCustom" element={<ChartjsCustom />} />
          <Route path="chartjsUserCustom" element={<ChartjsUserCustom />} />

          <Route path="nivo" element={<Nivo />} />
          <Route path="nivoUserCustom" element={<NivoUserCustom />} />
          <Route path="nivoUserCustomGeo" element={<NivoUserCustomGeo />} />

          <Route path="reactGridLayout" element={<ReactGridLayout />} />
          <Route
            path="reactGridLayoutRandomChart"
            element={<ReactGridLayoutRandomChart />}
          />
          <Route
            path="reactGridLayoutCustom"
            element={<ReactGridLayoutCustom />}
          />
          <Route
            path="reactGridLayoutAddRemove"
            element={<ReactGridLayoutAddRemove />}
          />
          <Route
            path="reactGridLayoutAddRemove2"
            element={<ReactGridLayoutAddRemove2 />}
          />
          {/* 차트 데모 라우트 추가 END */}
        </Route>
        {/* // ------------------ TEST 페이지 --------------- */}
        <Route path="error404" element={<Error404 />} />
        <Route path="error500" element={<Error500 />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<Error404 />} />{' '}
        {/* 위에 설정된 path 이외의 경로는 404 페이지로 이동 */}
      </Routes>
      <div id="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default App;
