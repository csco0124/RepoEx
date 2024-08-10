import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GridLayout, { Layout } from "react-grid-layout";
import LineChart from "./chart/LineChart";
import MapChart from "./chart/MapChart";

const pageMainDivStyle: React.CSSProperties = {
  width:"800px",
  height:"800px",
};
const gridDivStyle: React.CSSProperties = {
  borderStyle: "groove",
};

const ReactGridLayout = () => {

  const [chartLineData, setChartLineData] = useState([
    {"id":"Kyochon","data":[{"x":2016,"y":2911},{"x":2017,"y":3169},{"x":2018,"y":3305},{"x":2019,"y":3693},{"x":2020,"y":4358},{"x":2021,"y":4935},{"x":2022,"y":4989}]},
    {"id":"BHC","data":[{"x":2016,"y":2326},{"x":2017,"y":2391},{"x":2018,"y":2376},{"x":2019,"y":3186},{"x":2020,"y":4004},{"x":2021,"y":4771},{"x":2022,"y":5075}]},
    {"id":"BBQ","data":[{"x":2016,"y":2281},{"x":2017,"y":2417},{"x":2018,"y":2372},{"x":2019,"y":2464},{"x":2020,"y":3200},{"x":2021,"y":3624},{"x":2022,"y":4188}]}
  ]);

  const [gridLayout, setGridLayout] = useState<Layout[]>([
    { i: "a", w: 12, h: 1, x: 0, y: 0, static: true},
    { i: "b", w: 6, h: 6, x: 0, y: 1, minW: 6, minH: 4},
    { i: "c", w: 1, h: 2, x: 12, y: 1, },
    { i: "d", w: 9, h: 13, x: 12, y: 1, minW: 9, maxW: 9, minH: 13, maxH: 13}
  ]);
  

  const gridChange = (layout:Layout[]) => {
    console.log(layout);
    setGridLayout([...layout]);
  }

  const viewGridLayout = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(gridLayout);
  }

  return (
    <>
      <Link to="/test">Sample/Test 홈으로</Link>
      <br />
      <button onClick={(e) => viewGridLayout(e)}>위치정보 보기</button>
      <button onClick={(e) => viewGridLayout(e)}>차트변경</button>
      <hr />
      <div style={pageMainDivStyle}>
        <GridLayout
          className="layout"
          layout={gridLayout}
          cols={12}
          rowHeight={30}
          width={800}
          onLayoutChange={(layout) => gridChange(layout)}
        >
          <div key="a" style={gridDivStyle}>
            static
          </div>
          <div key="b">
            <div style={{height:"5px"}}><p className=" text-center"><small>ID: aaa / Line Chart</small></p></div>
            <div style={{height:"100%"}}>
            <LineChart data={chartLineData} />
            </div>
          </div>
          <div key="c" style={gridDivStyle}>c</div>
          <div key="d" style={gridDivStyle}>
            <div style={{height:"0px"}}><p className=" text-center"><small>ID: aaa / Geo Chart</small></p></div>
              <div style={{height:"100%"}}>
              <MapChart />
              </div>
            
          </div>
        </GridLayout>
      </div>
    </>
  );
};

export default ReactGridLayout;
