import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import { generateCountriesData, generateDrinkStats, generateWinesTastes } from '@nivo/generators'
import useInterval from "../../../common/useInterval";
import BarChart from "./chart/BarChart";
import LineChart from "./chart/LineChart";
import MapChart from "./chart/MapChart";
import StackbarChart from "./chart/StackbarChart";
import RadarChart from "./chart/RadarChart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const pageMainDivStyle: React.CSSProperties = {
  width:"1200px",
  height:"1200px",
};
const gridDivStyle: React.CSSProperties = {
  borderStyle: "groove",
};

const ReactGridLayoutRandomChart = () => {
  const [gridLayout, setGridLayout] = useState<Layout[]>([]);
	const [barData, setBarData] = useState<any>({});
	const [lineData, setLineData] = useState<any>({});
	const [radarData, setRadarData] = useState<any>({});
	const [mapData, setMapData] = useState<any>(null);
	
	const barChartKeys = ['Seoul', 'Busan', 'Incheon'];
  
  
	useEffect(() => {
    console.log('컴포넌트 화면 출력');
		genData();
    return () => {
      console.log('다른 컴포넌트로 전환');
    };
  }, []); 

	/* useInterval(() => {
		console.log('useInterval');
    genData();
  }, 1000);
 */
  const gridChange = (layout:Layout[]) => {
		console.log(layout);
		setGridLayout(layout);
  }

	const getRandomInt = (max:number) => {
		return Math.floor(Math.random() * max);
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

		const radarChartData = generateWinesTastes();
		setRadarData({indexBy:"taste", ...radarChartData});
	}

  return (
    <>
		<div style={{borderStyle:"groove", width:"1200px"}}>
    	<Link to="/test">Sample/Test 홈으로</Link>
			<button onClick={genData}>Generate Data</button>
		</div>
    <hr/>
    <div style={pageMainDivStyle}>
        <ResponsiveReactGridLayout
          className="layout"
          rowHeight={30}
          cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
          onLayoutChange={(layout) => gridChange(layout)}
        >
          <div key="aaa" data-grid={{ i: "aaa", w: 4, h: 7,	x: 0, y: 0, minW: 4, minH: 6}}>
						<div style={{height:"5px"}}><p className="text-center border-bottom border-secondary bg-light fw-bold">Bar Chart</p></div>
            <div style={{height:"100%"}}><BarChart data={barData} /></div>
          </div>
					<div key="bbb" data-grid={{ i: "bbb", w: 4, h: 7,	x: 4, y: 0, minW: 4, minH: 6}}>
						<div style={{height:"5px"}}><p className="text-center border-bottom border-secondary bg-light fw-bold">Line Chart</p></div>
            <div style={{height:"100%"}}><LineChart data={lineData} /></div>
          </div>
					<div key="ccc" data-grid={{ i: "ccc", w: 4, h: 7,	x: 8, y: 0, minW: 4, minH: 6}}>
						<div style={{height:"5px"}}><p className="text-center border-bottom border-secondary bg-light fw-bold">Stackbar Chart</p></div>
            <div style={{height:"100%"}}><StackbarChart data={barData} /></div>
          </div>
					<div key="ddd" data-grid={{ i: "ddd", w: 4, h: 7,	x: 0, y: 7, minW: 4, minH: 6}}>
						<div style={{height:"5px"}}><p className="text-center border-bottom border-secondary bg-light fw-bold">Radar Chart</p></div>
            <div style={{height:"100%"}}><RadarChart data={radarData} /></div>
          </div>
					<div key="eee" data-grid={{ i: "eee", w: 6, h: 13, x: 4, y: 7, minW: 9, maxW: 9, minH: 13, maxH: 13}}>
						<div style={{height:"5px"}}><p className="text-center border-bottom border-secondary bg-light fw-bold">Map Chart</p></div>
            <div style={{height:"100%"}}><MapChart data={mapData} />  </div>
          </div>
          
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
};

export default ReactGridLayoutRandomChart;
