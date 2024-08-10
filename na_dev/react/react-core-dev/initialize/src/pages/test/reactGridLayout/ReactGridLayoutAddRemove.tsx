import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import LineChart from "./chart/LineChart";
import MapChart from "./chart/MapChart";

import "./reactGridLayout.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayoutAddRemove = () => {
  const [layoutData, setLayoutData] = useState<Layout[]>([]);
  
  const [chartViewConfig, setChartViewConfig] = useState<any[]>([
    {key : "a",   dataGrid : { i: "a", w: 12, h: 1, x: 0, y: 0, static: true},                          chartType : ""},
    {key : "b",   dataGrid : { i: "b", w: 6, h: 8, x: 0, y: 1, minW: 6, minH: 6},                       chartType : "line"},
    {key : "c",   dataGrid : { i: "c", w: 1, h: 2, x: 12, y: 1,},                                       chartType : ""},
    {key : "d",   dataGrid : { i: "d", w: 9, h: 13, x: 12, y: 1, minW: 9, maxW: 9, minH: 13, maxH: 13}, chartType : "map"}
  ]);

  const [chartLineData, setChartLineData] = useState([
    {"id":"Kyochon","data":[{"x":2016,"y":2911},{"x":2017,"y":3169},{"x":2018,"y":3305},{"x":2019,"y":3693},{"x":2020,"y":4358},{"x":2021,"y":4935},{"x":2022,"y":4989}]},
    {"id":"BHC","data":[{"x":2016,"y":2326},{"x":2017,"y":2391},{"x":2018,"y":2376},{"x":2019,"y":3186},{"x":2020,"y":4004},{"x":2021,"y":4771},{"x":2022,"y":5075}]},
    {"id":"BBQ","data":[{"x":2016,"y":2281},{"x":2017,"y":2417},{"x":2018,"y":2372},{"x":2019,"y":2464},{"x":2020,"y":3200},{"x":2021,"y":3624},{"x":2022,"y":4188}]}
  ]);

  const gridChange = (layout:Layout[]) => {
    console.log(layout);
    setLayoutData([...layout]);
  }

  const viewGridLayout = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(layoutData);
  }

  const renderChart = (chartType:string) => {
    switch(chartType) {
      case 'line': 
        return (<LineChart data={chartLineData} />);  
      case 'map':
        return (<MapChart />);  
      default:
        break;
    }
  }

  return (
    <>
      <Link to="/test">Sample/Test 홈으로</Link>
      <br />
      <button onClick={(e) => viewGridLayout(e)}>위치정보 보기</button>
      <button onClick={(e) => viewGridLayout(e)}>차트변경</button>
      <hr />
      <div style={{width:"800px"}}>
        {/* {cols : 각각 사이즈(lg, md, sm, xs, xxs)에 따른 최대 열} */}
        <ResponsiveReactGridLayout
          className="layout"
          rowHeight={30}
          cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
          onLayoutChange={(layout) => gridChange(layout)}
        >
          {chartViewConfig.map((viewConfig, idx) => {
              console.log(viewConfig, idx);
              return (<div key={viewConfig.key} data-grid={viewConfig.dataGrid}>{renderChart(viewConfig.chartType)}</div>);
          })}
          {/* <div key="a" data-grid={{ i: "a", w: 12, h: 1, x: 0, y: 0, static: true}}>
            static
          </div>
          <div key="b" data-grid={{ i: "b", w: 6, h: 8, x: 0, y: 1, minW: 6, minH: 6}}>{renderChart("line")}</div>
          <div key="c" data-grid={{ i: "c", w: 1, h: 2, x: 12, y: 1, }}>c</div>
          <div key="d" data-grid={{ i: "d", w: 9, h: 13, x: 12, y: 1, minW: 9, maxW: 9, minH: 13, maxH: 13}}>{renderChart("map")}</div> */}
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
};

export default ReactGridLayoutAddRemove;
