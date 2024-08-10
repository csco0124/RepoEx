import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import LineChart from "./chart/LineChart";
import MapChart from "./chart/MapChart";
import BarChart from "./chart/BarChart";
import StackbarChart from "./chart/StackbarChart";
import RadarChart from "./chart/RadarChart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayoutCustomRenderChart = ({chartViewConfig, gridRowData, setLayoutData}:any) => {
  let {Month, ...chartLine} = gridRowData[0];
  let chartLineData:any = [];
  let chartBarData:any = [];
  let chartRadarData:any = [];
  
  for (let objKey in chartLine) {
    if(chartLine.hasOwnProperty(objKey)) {
      chartLineData.push({id:objKey});
      chartBarData.push(objKey);
      chartRadarData.push(objKey);
    }
  }
  
  const changeLineData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return Number(a.Month.replace('/','')) - Number(b.Month.replace('/',''));
    });

    // reverse() 이유 : 라인차트의 경우, 라벨 순서가 거꾸로 출력이 되는 버그가 있어서, 라벨 순서를 바꿔야 함
    const lineDataArray = chartLineData.reverse().map((lineData:any) => {
      let resData:any = [];
      sortGridRowData.map((gridData:any) => {
        resData.push({x : gridData.Month, y : gridData[lineData.id]});
      });
      lineData.data = [...resData];
      return lineData;
    });
    
    return lineDataArray;
  }

  const changeBarData = () => {
    let returnData:any = {};
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return Number(a.Month.replace('/','')) - Number(b.Month.replace('/',''));
    });
    const barDataArray:any[] = sortGridRowData.map((gridData:any) => {
      const { Month, ...barKey } = gridData;
      const tempData = {
        "country" : gridData.Month,
        ...barKey
      }
      return tempData;
    });
    console.log(barDataArray);
    returnData.data = barDataArray;
    returnData.keys = chartBarData;
    return returnData;
  }

  const changeRadarData = () => {
    let returnData:any = {};
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return Number(a.Month.replace('/','')) - Number(b.Month.replace('/',''));
    });
    const radarDataArray:any[] = sortGridRowData.map((gridData:any) => {
      return gridData;
    });
    returnData.data = radarDataArray;
    returnData.keys = chartRadarData;
    return returnData;
  }

  const gridChange = (layout:Layout[]) => {
    setLayoutData([...layout]);
  }

  const renderChart = (viewConfig:any) => {
    let data:any = [];

    switch(viewConfig.chartType) {
      case 'line': 
        return (
          <>
            <div style={{height:"5px"}}><p className="text-center border-bottom border-secondary">ID: {viewConfig.key} / Line Chart</p></div>
            <div style={{height:"100%"}}><LineChart data={changeLineData()} /></div>
          </>
        );
      case 'bar': 
        return (
          <>
            <div style={{height:"5px"}}><p className="text-center border-bottom border-secondary">ID: {viewConfig.key} / Bar Chart</p></div>
            <div style={{height:"100%"}}><BarChart data={changeBarData()}/></div>
          </>
        );
      case 'stackbar': 
      return (
          <>
            <div style={{height:"5px"}}><p className="text-center border-bottom border-secondary">ID: {viewConfig.key} / Stackbar Chart</p></div>
            <div style={{height:"100%"}}><StackbarChart data={changeBarData()} /></div>
          </>
        );
      case 'radar': 
        return (
          <>
            <div style={{height:"5px"}}><p className="text-center border-bottom border-secondary">ID: {viewConfig.key} / Radar Chart</p></div>
            <div style={{height:"100%"}}><RadarChart data={changeRadarData()} /></div>
          </>
        );
      case 'map':
        return (
          <>
            <div style={{height:"0px"}}><p className="text-center border-bottom border-secondary">ID: {viewConfig.key} / Geo Chart</p></div>
            <div style={{height:"100%"}}><MapChart /></div>
          </>
        );
      default:
        break;
    }
  }

  return (
    <>
      {/* {cols : 각각 사이즈(lg, md, sm, xs, xxs)에 따른 최대 열} */}
      <ResponsiveReactGridLayout
        className="layout"
        rowHeight={30}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
        onLayoutChange={(layout) => gridChange(layout)}
      >
        {chartViewConfig.map((viewConfig:any, idx:number) => {
          return (
            <div key={viewConfig.key} data-grid={viewConfig.dataGrid}>
              {renderChart(viewConfig)}
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    </>
  );
};

export default ReactGridLayoutCustomRenderChart;
