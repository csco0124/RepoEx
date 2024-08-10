import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import "./reactGridLayout.css";
import ReactGridLayoutCustomRenderChart from "./ReactGridLayoutCustomRenderChart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayoutCustom = () => {
  const [gridRowData, setGridRowData] = useState<any>([
    { Month : '2023/05', Seoul : 950, Busan : 860, Incheon : 800},
    { Month : '2023/04', Seoul : 900, Busan : 930, Incheon : 746},
    { Month : '2023/03', Seoul : 789, Busan : 890, Incheon : 795},
    { Month : '2023/02', Seoul : 790, Busan : 760, Incheon : 803},
    { Month : '2023/01', Seoul : 698, Busan : 730, Incheon : 786},
    { Month : '2022/12', Seoul : 718, Busan : 766, Incheon : 740},
    { Month : '2022/11', Seoul : 820, Busan : 790, Incheon : 702},
  ]);

  const [layoutData, setLayoutData] = useState<Layout[]>([]);
  const [chartViewConfig, setChartViewConfig] = useState<any[]>([]);

  useEffect(() => {
    let chartConfigData:any[] = [
      {key : "aaa",   dataGrid : { i: "aaa", w: 6, h: 8, x: 0, y: 0, minW: 6, minH: 6},                       chartType : "line"},
      {key : "bbb",   dataGrid : { i: "bbb", w: 6, h: 8, x: 6, y: 0, minW: 6, minH: 6},                       chartType : "bar"},
      {key : "ccc",   dataGrid : { i: "ccc", w: 6, h: 8, x: 0, y: 8, minW: 6, minH: 6},                       chartType : "stackbar"},
      {key : "ddd",   dataGrid : { i: "ddd", w: 6, h: 8, x: 6, y: 8, minW: 6, minH: 6},                       chartType : "radar"},
      {key : "eee",   dataGrid : { i: "eee", w: 9, h: 13, x: 0, y: 16, minW: 9, maxW: 9, minH: 13, maxH: 13}, chartType : "map"}
    ]
    
    setChartViewConfig([...chartConfigData]);
    // unmount
    return () => {
      
    };
  }, []);

  const viewGridLayout = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(layoutData);
  }

  const viewGridLayoutChartChange = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let test = [
      { Month : '2023/06', Seoul : 955, Busan : 858, Incheon : 798},
      { Month : '2023/05', Seoul : 950, Busan : 860, Incheon : 800},
      { Month : '2023/04', Seoul : 900, Busan : 930, Incheon : 746},
      { Month : '2023/03', Seoul : 789, Busan : 890, Incheon : 795},
      { Month : '2023/02', Seoul : 790, Busan : 760, Incheon : 803},
      { Month : '2023/01', Seoul : 698, Busan : 730, Incheon : 786},
      { Month : '2022/12', Seoul : 718, Busan : 766, Incheon : 740},
      { Month : '2022/11', Seoul : 820, Busan : 790, Incheon : 702},
    ];
    setGridRowData([...test]);

    /* let chartConfigData:any[] = [
      {key : "aaa",   dataGrid : { i: "aaa", w: 6, h: 8, x: 0, y: 0, minW: 6, minH: 6},                       chartType : "line"},
      {key : "bbb",   dataGrid : { i: "bbb", w: 6, h: 8, x: 6, y: 0, minW: 6, minH: 6},                       chartType : "bar"},
      {key : "ccc",   dataGrid : { i: "ccc", w: 6, h: 8, x: 0, y: 8, minW: 6, minH: 6},                       chartType : "stackbar"},
      {key : "ddd",   dataGrid : { i: "ddd", w: 6, h: 8, x: 6, y: 8, minW: 6, minH: 6},                       chartType : "radar"},
      {key : "eee",   dataGrid : { i: "eee", w: 9, h: 13, x: 0, y: 16, minW: 9, maxW: 9, minH: 13, maxH: 13}, chartType : "map"},
      {key : "fff",   dataGrid : { i: "fff", w: 6, h: 8, x: 0, y: 8, minW: 6, minH: 6},                       chartType : "stackbar"},
    ]
    
    setChartViewConfig([...chartConfigData]); */
  }

  return ( 
    <>
      <Link to="/test">Sample/Test 홈으로</Link>
      <hr />
      <button onClick={(e) => viewGridLayout(e)}>위치정보 보기</button>
      <button onClick={(e) => viewGridLayoutChartChange(e)}>차트변경</button>
      <hr />
      <div style={{width:"800px"}}>
        <ReactGridLayoutCustomRenderChart chartViewConfig={chartViewConfig} gridRowData={gridRowData} setLayoutData={setLayoutData}/>
      </div>
    </>
  );
};

export default ReactGridLayoutCustom;
