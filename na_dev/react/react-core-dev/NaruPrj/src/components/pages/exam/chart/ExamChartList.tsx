import { useEffect, useState } from "react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import { generateCountriesData, generateDrinkStats, generateProgrammingLanguageStats, generateWinesTastes, generateNetworkData, generateLibTree, generateDayCounts } from '@nivo/generators'
import BarChart from "./chart-component/BarChart";
import LineChart from "./chart-component/LineChart";
import MapChart from "./chart-component/MapChart";
import StackbarChart from "./chart-component/StackbarChart";
import PieChart from "./chart-component/PieChart";
import RadarChart from "./chart-component/RadarChart";
import NetworkChart from "./chart-component/NetworkChart";
import TreemapChart from "./chart-component/TreemapChart";
import TimeRangeChart from "./chart-component/TimeRangeChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setTreeParentsNodeName } from "../../../../store/LeftTreeReducer";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const gridMapStyle: React.CSSProperties = {
	overflow : "hidden"
};

const ExamChartList = () => {

	const leftMenuState = useSelector((state: RootState) => state.leftTree);
	const dispatch = useDispatch();

	const [gridLayout, setGridLayout] = useState<Layout[]>([]);
	const [barData, setBarData] = useState<any>({});
	const [lineData, setLineData] = useState<any>({});
	const [radarData, setRadarData] = useState<any>({});
	const [pieData, setPieData] = useState<any>({});
	const [mapData, setMapData] = useState<any>(null);
	const [networkData, setNetworkData] = useState<any>({});
	const [treemapData, setTreemapData] = useState<any>({});
	const [timeRangeData, setTimeRangeData] = useState<any>([]);
	

	const barChartKeys = ['Seoul', 'Busan', 'Incheon'];

	useEffect(() => {
    console.log('컴포넌트 화면 출력');
		genData();
    return () => {
      console.log('다른 컴포넌트로 전환');
    };
  }, []);

	useEffect(() => {
    console.log('leftMenuState.textArray', leftMenuState.textArray);
  }, [leftMenuState.textArray]);

	const getRandomInt = (max:number) => {
		return Math.floor(Math.random() * max);
	}

	const gridChange = (layout:Layout[]) => {
		console.log('layout', layout);
		setGridLayout(layout);
  }

	const genData = () => {
		const barChartData = generateCountriesData(barChartKeys, { size: 7, min:20, max:100 })
		setBarData({keys:barChartKeys, data:barChartData});

		const lineChartData = generateDrinkStats(6);
		setLineData(lineChartData);

		const mapChartData = [
			{"id":"11", "value": getRandomInt(100)},	{"id":"21", "value": getRandomInt(100)},	{"id":"22", "value": getRandomInt(100)},
			{"id":"23", "value": getRandomInt(100)},	{"id":"24", "value": getRandomInt(100)},	{"id":"25", "value": getRandomInt(100)},
			{"id":"26", "value": getRandomInt(100)},	{"id":"29", "value": getRandomInt(100)},	{"id":"31", "value": getRandomInt(100)},
			{"id":"32", "value": getRandomInt(100)},	{"id":"33", "value": getRandomInt(100)},	{"id":"34", "value": getRandomInt(100)},
			{"id":"35", "value": getRandomInt(100)},	{"id":"36", "value": getRandomInt(100)},	{"id":"37", "value": getRandomInt(100)},
			{"id":"38", "value": getRandomInt(100)},	{"id":"39", "value": getRandomInt(100)}
		];
		setMapData(mapChartData);

		const pieChartData = generateProgrammingLanguageStats(true, 5).map(({ label, ...data }) => ({
      id: label,
      ...data,
    }));
		setPieData(pieChartData);

		const radarChartData = generateWinesTastes();
		setRadarData({indexBy:"taste", ...radarChartData});

		const networkChartData = generateNetworkData({maxMidNodes:5, maxLeaves:10});
		setNetworkData(networkChartData);

		const treemapChartData = generateLibTree();
		setTreemapData(treemapChartData);

		const timeRangeChartData = generateDayCounts(new Date(2022, 12-1, 31), new Date(2023, 5-1, 32), 300);
		setTimeRangeData(timeRangeChartData);
	}
	
	return (
		<div className="content">
			<div className="title-item">
				<h2 className="h2-title">차트 모음</h2>
				<ul className="location">
					<li>예제</li><li>차트예제</li><li>차트 모음</li>
				</ul>
			</div>
			<div className="form-itme mt-3">
			<button type="button" className="btn btn-outline-secondary btn-sm" onClick={genData}>Roll the Dice</button>
			</div>
			<ResponsiveReactGridLayout
				className="layout"
				rowHeight={30}
				cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
				onLayoutChange={(layout) => gridChange(layout)}
			>
				<div key="aaa" data-grid={{ i: "aaa", w: 4, h: 7,	x: 0, y: 0, minW: 4, minH: 6}}>
					<div><p className="h3-title">Bar Chart</p></div>
					<div style={{height:"100%"}}><BarChart data={barData} /></div>
				</div>
				<div key="bbb" data-grid={{ i: "bbb", w: 4, h: 7,	x: 4, y: 0, minW: 4, minH: 6}}>
					<div><p className="h3-title">Line Chart</p></div>
					<div style={{height:"100%"}}><LineChart data={lineData} /></div>
				</div>
				<div key="ccc" data-grid={{ i: "ccc", w: 4, h: 7,	x: 8, y: 0, minW: 4, minH: 6}}>
					<div><p className="h3-title">Stackbar Chart</p></div>
					<div style={{height:"100%"}}><StackbarChart data={barData} /></div>
				</div>
				<div key="ddd" data-grid={{ i: "ddd", w: 4, h: 7,	x: 0, y: 7, minW: 4, minH: 6}}>
					<div><p className="h3-title">Radar Chart</p></div>
					<div style={{height:"100%"}}><RadarChart data={radarData} /></div>
				</div>
				<div key="eee" data-grid={{ i: "eee", w: 4, h: 7,	x: 0, y: 14, minW: 4, minH: 6}}>
					<div><p className="h3-title">Pie Chart</p></div>
					<div style={{height:"100%"}}><PieChart data={pieData} /></div>
				</div>
				<div key="fff" data-grid={{ i: "fff", w: 6, h: 14, x: 4, y: 14, minW: 6, maxW: 9, minH: 14, maxH: 14}} style={{...gridMapStyle}}>
					<div><p className="h3-title">Map Chart</p></div>
					<div style={{height:"100%"}}><MapChart data={mapData} />  </div>
				</div>
				<div key="ggg" data-grid={{ i: "ggg", w: 4, h: 7,	x: 0, y: 21, minW: 4, minH: 6}}>
					<div><p className="h3-title">Network Chart</p></div>
					<div style={{height:"100%"}}><NetworkChart data={networkData} /></div>
				</div>
				<div key="hhh" data-grid={{ i: "hhh", w: 4, h: 7,	x: 4, y: 7, minW: 4, minH: 6}}>
					<div><p className="h3-title">Treemap Chart</p></div>
					<div style={{height:"100%"}}><TreemapChart data={treemapData} /></div>
				</div>
				<div key="iii" data-grid={{ i: "iii", w: 4, h: 7,	x: 8, y: 7, minW: 4, minH: 7}}>
					<div><p className="h3-title">TimeRange Chart</p></div>
					<div style={{height:"100%"}}><TimeRangeChart data={timeRangeData} /></div>
				</div>
						
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default ExamChartList