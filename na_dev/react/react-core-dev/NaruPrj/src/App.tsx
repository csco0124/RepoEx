import './App.css';
import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// redux
import { store, persistor } from './redux/store';

import { SnackbarProvider } from 'notistack';

import {
  Login,
  AdminInfoMgt,
  DashBoardCbMgt,
  NotFound,
} from './components/pages';
import {withTranslation} from "react-i18next";
import Header from './components/layout/Header';
import Side from './components/layout/Side';
import Footer from './components/layout/Footer';
import Popup from './components/layout/Popup';
import PopupCard from './components/layout/PopupCard';
import LocationChangeAction from './components/common/LocationChangeAction';
import $api from './common/CommonAxios';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PageMoveLoad from './components/common/PageMoveLoad';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import { getTreeData } from './store/LeftTreeReducer';
import componentsModules from './comp-mod';
import DemoMgt from './components/pages/DemoMgt';
import AdminMenuMgt from './components/pages/AdminMenuMgt';
import AdminMenuMgt2 from './components/pages/AdminMenuMgt2';
import ComplexTreeExam from './components/pages/ComplexTreeExam';
import ArboristTreeExam from './components/pages/ArboristTreeExam';
import ExamTreeTest1 from './components/pages/exam/ExamTreeTest1';
import ExamChartList from './components/pages/exam/chart/ExamChartList';
import ExamChartCustom from './components/pages/exam/chart/ExamChartCustom';
import StartPage from './components/pages/exam/grid/byungYoon/StartPage';
import PageEditor from './components/pages/exam/board/PageEditor';
import PageList from './components/pages/exam/board/PageList';
import ReactTableGrid from './components/pages/exam/grid/byungYoon/ReactTableGrid';
import PjsTest from './components/pages/exam/grid/pjs/PjsTest';
import PjsTestVer2 from './components/pages/exam/grid/pjs/PjsTestVer2';
import DateAndTimeExam from './components/pages/exam/utility/DateAndTimeExam';
import NumberCalcExam from './components/pages/exam/utility/NumberCalcExam';
import ExamLocalStorage from './components/pages/exam/utility/ExamLocalStorage';
import ExamCommonUtils from './components/pages/exam/utility/ExamCommonUtils';
import ReactTable_tanstack from './components/pages/exam/grid/hyeonSu/ReacTable_tanstack';
import TanStackTableView from './components/pages/exam/grid/hyeonSu/TanStackTableView';
import ReactTableTest from './components/pages/exam/grid/hoJin/ReactTableTest';
import Pub001 from './components/pages/exam/publish/Pub001';
import Pub002 from './components/pages/exam/publish/Pub002';
import Pub003 from './components/pages/exam/publish/Pub003';
import ModalJsHandling from './components/pages/exam/utility/ModalJsHandling';
import ExamCanvasList from './components/pages/exam/canvas/Index';
import ExamCanvas1 from './components/pages/exam/canvas/ExamCanvas1';
import ExamCanvas2 from './components/pages/exam/canvas/ExamCanvas2';
import ExamCanvas3 from './components/pages/exam/canvas/ExamCanvas3';
import ExamCanvas4 from './components/pages/exam/canvas/ExamCanvas4';
import ExamCanvas5 from './components/pages/exam/canvas/ExamCanvas5';
import ExamCanvas6 from './components/pages/exam/canvas/ExamCanvas6';

import ApexChartExam from './components/pages/exam/chart/ApexChartExam';
import TanStackTableV2 from './components/pages/exam/grid/hyeonSu/TanStackTableV2';
import ExamAgGrid from "./components/pages/exam/grid/lhj/ExamAgGrid";
import VworldExam from './components/pages/exam/vworld/VworldExam';
import NavermapsExam from './components/pages/exam/navermaps/NavermapsExam';
import alertContext from './store/alert-context';
import axios from 'axios';
import {isUserLogin} from "./common/commonUtil";
import I18nExample from './components/pages/exam/utility/I18nExample';
import ReactQueryExam from './components/pages/exam/utility/ReactQueryExam';
import TinyMCEExam from './components/pages/exam/board/tiny/TinyMCEExam';
import ReactQueryMutateExam from './components/pages/exam/utility/ReactQueryMutateExam';
import StateExam from './components/pages/exam/guide/StateExam';
import ReactQueryInfoExam from './components/pages/exam/utility/ReactQueryInfoExam';
import WebSocketExam from './components/pages/exam/utility/websocket/WebSocketExam';
import ReactSWRExam from './components/pages/exam/utility/ReactSWRExam';
import ReactSWRResultExam from './components/pages/exam/utility/ReactSWRResultExam';
import ContextResponseExam from './components/pages/exam/utility/ContextResponseExam';
import ContextExam from './components/pages/exam/utility/ContextExam';
import VideoExam from './components/pages/exam/utility/VideoExam';

function noLayout() {
  const wrap = document.querySelector('.wrap') as HTMLVideoElement;
  const content = document.querySelector('.content') as HTMLVideoElement;
  if (content.classList.contains('center')) {
    wrap.classList.add('no-navi');
  } else {
    wrap.classList.remove('no-navi');
  }
}

/**
 * 라우팅 설정 자동화
 * @param menuArray DB조회 메뉴리스트
 * @returns
 */
const SetRoutes = (menuArray:Array<any>) => {
  const newMenuArray:Array<any> = [];

  for(const i in menuArray) {
    const treeData = {...menuArray[i]};

    if(componentsModules.hasOwnProperty(treeData['path'] + '.tsx')) {
      treeData.component = componentsModules[treeData['path'] + '.tsx'];
      newMenuArray.push(treeData);
    }
  }
  return (
    <>
      <HelmetProvider>
        <Routes>
					<Route key='main' path='/' element={<><Helmet title='통합관리자 메인' /><AdminInfoMgt /></>} />
					<Route key='AdminInfoMgt' path='/AdminInfoMgt' element={<><Helmet title='통합관리자 메인' /><AdminInfoMgt /></>} />
					<Route key='DashBoardCbMgt' path='/DashBoardCbMgt' element={<><Helmet title='대시보드 메인' /><DashBoardCbMgt /></>} />
					<Route key='DemoMgt' path='/DemoMgt' element={<><Helmet title='데모 메인' /><DemoMgt /></>} />
					<Route key='login' path='/login' element={<><Helmet title='로그인' /><Login /></>} />
					<Route path="/ReactTableGrid" element={<ReactTableGrid />} />
          <Route path="/PageEditor" element={<PageEditor />} />
          <Route key='error404' path='*' element={<><Helmet title='error404' /><NotFound /></>} />
          <Route key='PageMoveLoad' path='/PageMoveLoad' element={<><Helmet title='PageMoveLoad' /><PageMoveLoad /></>} />

					<Route key='examCanvasList' path='/examCanvas' element={<><Helmet title='list' /><ExamCanvasList /></>} />
					<Route key='jsPage2' path='jsPage2' element={<><Helmet title='종석테스트_ver.2' /><PjsTestVer2 /></>} />
					<Route key='jsPage' path='jsPage' element={<><Helmet title='종석테스트' /><PjsTest /></>} />
					<Route key='ExamChartList' path='examChartList' element={<><Helmet title='차트 모음(김동건)' /><ExamChartList /></>} />
					<Route key='ExamChartCustom' path='examChartCustom' element={<><Helmet title='차트 사용자정의(김동건)' /><ExamChartCustom /></>} />
					<Route key='StartPage' path='startPage' element={<><Helmet title='API-MOCHA 및 그리드(문병윤)' /><StartPage /></>} />
					<Route key='Pub001' path='Pub001' element={<><Helmet title='001' /><Pub001 /></>} />
					<Route key='Pub002' path='Pub002' element={<><Helmet title='002' /><Pub002 /></>} />
					<Route key='Pub003' path='Pub003' element={<><Helmet title='003' /><Pub003 /></>} />
					<Route key='ModalJsHandling' path='/modalJsHandling' element={<><Helmet title='Modal JS Control(김동건)' /><ModalJsHandling /></>} />
					<Route key='adminMenuMgt2' path='adminMenuMgt2' element={<><Helmet title='BIZ 메뉴 관리 예제 - (이광희)' /><AdminMenuMgt2 /></>} />
					<Route key='DateAndTimeExam' path='dateAndTimeExam' element={<><Helmet title='날짜 유틸 date-and-time(김동건)' /><DateAndTimeExam /></>} />
					<Route key='NumberCalcExam' path='/numberCalcExam' element={<><Helmet title='JS 소수점계산 유틸(김동건)' /><NumberCalcExam /></>} />
					<Route key='ReactTableTest' path='ReactTableTest' element={<><Helmet title='호진테이블ver.1' /><ReactTableTest /></>} />
					<Route key='ReactTable_tanstack' path='ReactTable_tanstack' element={<><Helmet title='현수테이블' /><ReactTable_tanstack /></>} />
					<Route key='ExamLocalStorage' path='/examLocalStorage' element={<><Helmet title='로컬스토리지 공통함수(김동건)' /><ExamLocalStorage /></>} />
					<Route key='examCommonUtils' path='examCommonUtils' element={<><Helmet title='공통 유틸 예제(이화종)' /><ExamCommonUtils /></>} />
					<Route key='TanStackTableView' path='/TanStackTableView' element={<><Helmet title='현수테이블v2' /><TanStackTableView /></>} />
					<Route key='TanStackTableV2' path='TanStackTableV2' element={<><Helmet title='현수테이블v3' /><TanStackTableV2 /></>} />
					<Route key='ApexChartExam' path='apexChartExam' element={<><Helmet title='Apex차트예제(김동건)' /><ApexChartExam /></>} />
					<Route key='ExamCanvas1' path='examCanvas/1' element={<><Helmet title='Filter Test' /><ExamCanvas1 /></>} />
					<Route key='ExamCanvas2' path='examCanvas/2' element={<><Helmet title='Dote Draw' /><ExamCanvas2 /></>} />
					<Route key='ExamCanvas3' path='examCanvas/3' element={<><Helmet title='Shooting Game' /><ExamCanvas3 /></>} />
					<Route key='ExamCanvas4' path='examCanvas/4' element={<><Helmet title='Tetris' /><ExamCanvas4 /></>} />
					<Route key='I18nExample' path='/i18nExample' element={<><Helmet title='다국어 유틸(김동건)' /><I18nExample /></>} />
					<Route key='pageList' path='pageList' element={<><Helmet title='목록(문병윤)' /><PageList /></>} />
					<Route key='ReactQueryExam' path='/reactQueryExam' element={<><Helmet title='react-query 사용법(김동건)' /><ReactQueryExam /></>} />
					<Route key='ExamCanvas5' path='examCanvas/5' element={<><Helmet title='Chart' /><ExamCanvas5 /></>} />
					<Route key='VworldExam' path='MapExam/VworldExam' element={<><Helmet title='vworld-api(이광희)' /><VworldExam /></>} />
					<Route key='TinyMCEExam' path='/tinyMCEExam' element={<><Helmet title='TinyMCE 예제(김동건)' /><TinyMCEExam /></>} />
					<Route key='examAgGrid' path='examAgGrid' element={<><Helmet title='AG-GRID 예제(이화종)' /><ExamAgGrid /></>} />
					<Route key='NavermapsExam' path='MapExam/NavermapsExam' element={<><Helmet title='네이버지도-api' /><NavermapsExam /></>} />
					<Route key='ReactQueryMutateExam' path='/reactQueryMutateExam' element={<><Helmet title='react-query Mutate 사용법(김동건)' /><ReactQueryMutateExam /></>} />
					<Route key='StateExam' path='/guide/StateExam' element={<><Helmet title='상태관리' /><StateExam /></>} />
					<Route key='ReactQueryInfoExam' path='/reactQueryInfoExam' element={<><Helmet title='react-query 저장 정보 조회(김동건)' /><ReactQueryInfoExam /></>} />
					<Route key='WebSocketExam' path='/webSocketExam' element={<><Helmet title='웹소켓예제(김동건)' /><WebSocketExam /></>} />
					<Route key='ReactSWRExam' path='/reactSWRExam' element={<><Helmet title='SWR 사용법(김동건)' /><ReactSWRExam /></>} />
					<Route key='ReactSWRResultExam' path='/reactSWRResultExam' element={<><Helmet title='SWR 사용법 데이터 가져오기(김동건)' /><ReactSWRResultExam /></>} />
					<Route key='ExamCanvas6' path='examCanvas/6' element={<><Helmet title='game' /><ExamCanvas6 /></>} />
					<Route key='ContextExam' path='/contextExam' element={<><Helmet title='Context API 예제 (김동건)' /><ContextExam /></>} />
					<Route key='ContextResponseExam' path='/contextResponseExam' element={<><Helmet title='Context API 예제 결과 (김동건)' /><ContextResponseExam /></>} />
					<Route key='VideoExam' path='/videoExam' element={<><Helmet title='동영상 핸들링(김동건)' /><VideoExam /></>} />

					{/* Lazy 로딩 로직 삭제
					{
						newMenuArray.map((menu, i) => (
                <Route key={menu.id} path={menu.url} element={
                  <>
                    <Helmet title={menu.text} />
                    {ConvertLoadable(menu)}
                  </>
                } />
            ))
          } */}
        </Routes>
      </HelmetProvider>
    </>
  );
};

/**
 * loadable을 이용한 수동 import component
 * @param path 파일 경로
 * @returns
 */
const ConvertLoadable = (obj:any) => {
  // 로딩 페이지 선 호출 후 페이지 이동하도록 설정
  // 김동건 2023.06.08 : 터미널 경고 메시지 방지를 위해서 주석처리 해놓았습니다.
  // 박영정 2023.06.08 : 검색결과 './' 혹은 '../'로 시작하는 실제 파일 경로가 아니므로 경고문구가 뜨는 것으로 확인,
  // 해당 경고문구가 나오지 않게 ignore 처리 했습니다.
  const Loadable = (Component: any) => (props: any) =>
    (
      <Suspense fallback={<PageMoveLoad />}>
        <Component {...props} />
      </Suspense>
    );

  const Element = Loadable(lazy(obj.component));
    return <><Element /></>;
}

const App = () => {

	const commAlert = useContext(alertContext);

  const [isNoNavi, setIsNoNavi] = useState<boolean>(false);



  // left menu data load
  const leftMenuState = useSelector((state: RootState) => state.leftTree);
  const dispatch = useDispatch();
	


  useEffect(() => {
		const user = async() => {
			const isUserLoginRes:any = await isUserLogin();
			if("F" === isUserLoginRes){
				commAlert.call({
					message: '로그인이 필요합니다.',
					onClose: () => {
						location.href=import.meta.env.VITE_APP_OAUTH2_LOGIN_URL;
					}
				});
			} else if ("A" === isUserLoginRes) {
				commAlert.call({
					message: '시스템 접근 권한이 필요합니다.\n관리자에게 요청해주세요.',
					onClose: () => {
						location.href=`${import.meta.env.VITE_APP_BACKEND_CALL_URL}/logout`;
					}
				});
			} else{
				// 데이터 조회
				//csrf 토큰 초기화
				$api.get('/api/callInit');
				dispatch(getTreeData({treeType3: 7}));
			}
		}
		user();
  }, []);

  let keysArray: any = [];

  // url, path 존재하는 값 별도 추출
  for (let key in leftMenuState.treeData1) {
    if (
      leftMenuState.treeData1[key].hasOwnProperty('url') &&
      leftMenuState.treeData1[key]['url'] != '' &&
      leftMenuState.treeData1[key].hasOwnProperty('path') &&
      leftMenuState.treeData1[key]['path'] != ''
    ) {
      keysArray.push(leftMenuState.treeData1[key]);
    }
  }
  for (let key in leftMenuState.treeData2) {
    if (
      leftMenuState.treeData2[key].hasOwnProperty('url') &&
      leftMenuState.treeData2[key]['url'] != '' &&
      leftMenuState.treeData2[key].hasOwnProperty('path') &&
      leftMenuState.treeData2[key]['path'] != ''
    ) {
      keysArray.push(leftMenuState.treeData2[key]);
    }
  }
  for (let key in leftMenuState.treeData3) {
    if (
      leftMenuState.treeData3[key].hasOwnProperty('url') &&
      leftMenuState.treeData3[key]['url'] != '' &&
      leftMenuState.treeData3[key].hasOwnProperty('path') &&
      leftMenuState.treeData3[key]['path'] != ''
    ) {
      keysArray.push(leftMenuState.treeData3[key]);
    }
  }

  // 현재 treeData에 등록된 url을 기준으로 route되도록 설정, 추가 route 필요 시
  // treeData에 저장 및 페이지 업로드 완료 시 해당 기능 정상 작동
  // App.tsx에서 treeData를 정의 하므로, Side등 에서 추가 조회 필요할지 정의 필요

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <BrowserRouter>
            <LocationChangeAction setIsNoNavi={setIsNoNavi} />
            <div className={`wrap ${isNoNavi ? 'no-navi' : ''}`}>
              <Side />
              <section className="container">
                <Header />
                {SetRoutes(keysArray)}
                {/* <Routes>
                  <Route path="/" element={<AdminInfoMgt />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/adminSystemMgt/adminAdminMgt/adminInfoMgt"
                    element={<AdminInfoMgt />}
                  />
                  <Route path="/dashBoardCbMgt" element={<DashBoardCbMgt />} />
                  <Route path="/demoMgt" element={<DemoMgt />} />
                  <Route
                    path="/adminSystemMgt/adminBizMgt/adminMenuMgt"
                    element={<AdminMenuMgt />}
                  />
                  <Route path="/adminMenuMgt2" element={<AdminMenuMgt2 />} />
                  <Route path="/arboristTreeExam" element={<ArboristTreeExam />} />
                  <Route path="/complexTree" element={<ComplexTreeExam />} />
                  <Route path="/examTreeTest1" element={<ExamTreeTest1 />} />
                  <Route path="/examChartList" element={<ExamChartList />} />
                  <Route path="/examChartCustom" element={<ExamChartCustom />} />
                  <Route path="/apexChartExam" element={<ApexChartExam />} />
                  <Route path="/StartPage" element={<StartPage />} />
                  <Route path="/ReactTableGrid" element={<ReactTableGrid />} />
                  <Route path="/jsPage" element={<PjsTest />} />
                  <Route path="/jsPage2" element={<PjsTestVer2 />} />
                  <Route path="/dateAndTimeExam" element={<DateAndTimeExam />} />
                  <Route path="/numberCalcExam" element={<NumberCalcExam />} />
                  <Route path="/examLocalStorage" element={<ExamLocalStorage />} />
                  <Route path="/examCommonUtils" element={<ExamCommonUtils />} />
                  <Route path="/examAgGrid" element={<ExamAgGrid />} />
                  <Route
                    path="/ReactTable_tanstack"
                    element={<ReactTable_tanstack />}
                  />
                  <Route path="/TanStackTableView" element={<TanStackTableView />} />
                  <Route path="/TanStackTableV2" element={<TanStackTableV2 />} />
                  <Route
                    path="/ReactTableTest"
                    element={<ReactTableTest />}
                  />
                  <Route path="/Pub001" element={<Pub001 />} />
                  <Route path="/Pub002" element={<Pub002 />} />
                  <Route path="/Pub003" element={<Pub003 />} />
                  <Route path="/modalJsHandling" element={<ModalJsHandling />} />
                  <Route path="/examCanvas" element={<ExamCanvasList />} />
                  <Route path="/examCanvas/1" element={<ExamCanvas1 />} />
                  <Route path="/examCanvas/2" element={<ExamCanvas2 />} />
                  <Route path="/examCanvas/3" element={<ExamCanvas3 />} />
                  <Route path="/examCanvas/4" element={<ExamCanvas4 />} />
                  <Route path="/pageList" element={<PageList />} />
                  // <Route path="/pageEditor" element={<PageEditor />} />
                  <Route path="*" element={<NotFound />} />
                </Routes> */}
                <Footer />
              </section>
              <Popup />
              <PopupCard />
            </div>
            <div id="loading" style={{ zIndex: 9999 }}>
              <div className="spinner"></div>
            </div>
          </BrowserRouter>
        </SnackbarProvider>
      </PersistGate>
    </ReduxProvider>
  );
  noLayout();
};

export default withTranslation()(App);
