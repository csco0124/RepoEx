import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NivoUserCustomLine from "./NivoUserCustomLine";
import NivoUserCustomBar from "./NivoUserCustomBar";
import NivoUserCustomStackBar from "./NivoUserCustomStackBar";
import NivoUserCustomBump from "./NivoUserCustomBump";
import NivoUserCustomRadar from "./NivoUserCustomRadar";

const chartDivStyle: React.CSSProperties = {
  float: "left",
  width: "500px",
  height: "300px",
  margin: "0 auto",
};

const gridColumnDefs = [
  { field: "Year", width: 100, editable: false},
  { field: "Kyochon", width: 142 },
  { field: "BHC", width: 142 },
  { field: "BBQ", width: 142 },
];

const selectOptions:Array<any> = [
  {id:'line', name:'Line Chart'},
  {id:'bar', name:'Bar Chart'},
  {id:'Stackbar', name:'Stackbar Chart'},
  {id:'Radar', name:'Radar Chart'},
]
const selectOptions2:Array<any> = [
  {id:'line', name:'Line Chart'},
  {id:'bar', name:'Bar Chart'},
  {id:'Stackbar', name:'Stackbar Chart'},
  {id:'Radar', name:'Radar Chart'},
]

const NivoUserCustom = () => {

  const [renderChart, setRenderChart] = useState<JSX.Element>();
  const [renderChart2, setRenderChart2] = useState<JSX.Element>();

  const gridRef = useRef<any>();
  const select1Ref = useRef<any>();
  const select2Ref = useRef<any>();
  const [gridRowData, setGridRowData] = useState([
    { Year : 2022, Kyochon : 4989, BHC : 5075, BBQ : 4188},
    { Year : 2021, Kyochon : 4935, BHC : 4771, BBQ : 3624},
    { Year : 2020, Kyochon : 4358, BHC : 4004, BBQ : 3200},
    { Year : 2019, Kyochon : 3693, BHC : 3186, BBQ : 2464},
    { Year : 2018, Kyochon : 3305, BHC : 2376, BBQ : 2372},
    { Year : 2017, Kyochon : 3169, BHC : 2391, BBQ : 2417},
    { Year : 2016, Kyochon : 2911, BHC : 2326, BBQ : 2281},
  ]);

  const [chartLineData, setChartLineData] = useState([
    { id: "Kyochon", data: [] },
    { id: "BHC",     data: [] },
    { id: "BBQ",     data: [] }
  ]);
  const [chartBarData, setChartBarData] = useState<any[]>([]);
  const [chartRadarData, setChartRadarData] = useState<any[]>([]);
  const [chartBarDataKeys, setChartBarDataKeys] = useState([
    'BBQ',
    'BHC',
    'Kyochon',
]);


  useEffect(() => {
    changeLineData();
    changeBarData();
    changeRadarData();
    const { Year, ...barKey } = gridRowData[0];
    console.log(barKey);  // Year 객체 뺀 값
    return () => {};
  }, []);

  useEffect(() => {
    changeChartRendering(select1Ref.current.value);
    changeChartRendering2(select2Ref.current.value);
  }, [chartLineData, chartBarData]);

  const changeLineData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Year - b.Year;
    });
    const lineDataArray = chartLineData.map((lineData:any) => {
      let resData:any = [];
      sortGridRowData.map((gridData:any) => {
        resData.push({x : gridData.Year, y : gridData[lineData.id]});
      });
      lineData.data = [...resData];
      return lineData;
    });
    console.log(lineDataArray);
    setChartLineData(lineDataArray);
  }

  const changeBarData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Year - b.Year;
    });
    const barDataArray:any[] = sortGridRowData.map((gridData:any) => {
      const { Year, ...barKey } = gridData;
      const tempData = {
        "country" : gridData.Year,
        ...barKey
      }
      return tempData;
    });
    setChartBarData(barDataArray);
  }

  const changeRadarData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Year - b.Year;
    });
    const radarDataArray:any[] = sortGridRowData.map((gridData:any) => {
      return gridData;
    });
    setChartRadarData(radarDataArray);
  }
  
  const gridDefaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      flex: 1
    };
  }, []);

  const changeChartRendering = (value:string) => {
    switch(value) {
      case 'line':
        setRenderChart(<NivoUserCustomLine data={chartLineData} />);
        break;
      case 'bar':
        setRenderChart(<NivoUserCustomBar data={chartBarData} keys={chartBarDataKeys}/>);
        break;
      case 'Stackbar':
        setRenderChart(<NivoUserCustomStackBar data={chartBarData} keys={chartBarDataKeys}/>);
        break;
      case 'Radar':
        setRenderChart(<NivoUserCustomRadar data={chartRadarData} keys={chartBarDataKeys}  index={"Year"}/>);
        break;
      default:
        break;
    }
  }
  const changeChartRendering2 = (value:string) => {
    switch(value) {
      case 'line':
        setRenderChart2(<NivoUserCustomLine data={chartLineData} />);
        break;
      case 'bar':
        setRenderChart2(<NivoUserCustomBar data={chartBarData} keys={chartBarDataKeys}/>);
        break;
      case 'Stackbar':
        setRenderChart2(<NivoUserCustomStackBar data={chartBarData} keys={chartBarDataKeys}/>);
        break;
      case 'Radar':
        setRenderChart2(<NivoUserCustomRadar data={chartRadarData} keys={chartBarDataKeys} index={"Year"}/>);
        break;
      default:
        break;
    }
  }

  const addRow = () => {
    let nextYear = (gridRowData[0].Year)+1;
    let addData = [{ Year: nextYear, Kyochon: 0, BHC: 0, BBQ: 0}];
    setGridRowData([...addData, ...gridRowData]);
  }

  const executeData = () => {
    gridStopEdit();
    changeLineData();
    changeBarData();
    changeRadarData();
  }
  
  const gridStopEdit = () => {
    let api:any = gridRef.current.api;
    api.stopEditing(false);
  }
  return (
    <>
      <Link to="/test">Sample/Test 홈으로</Link>
      <hr />
      <div className="row">
        <div className="col-7">
          <div className="ag-theme-alpine" style={{ height: 200, width: 480, float:"left", marginRight:"15px" }} >
          <div style={{textAlign:"center"}}><b>국내 3대 치킨업계 매출액 (단위 : 억)</b></div>
            <AgGridReact rowData={gridRowData} columnDefs={gridColumnDefs} defaultColDef={gridDefaultColDef} ref={gridRef}></AgGridReact>
          </div>
          <div style={{float:"left" }}>
          <button onClick={addRow}>로우 추가</button><br />
          <button onClick={executeData}>적용</button>
          </div>
        </div>
        <div className="col-5">
          <div style={{height:'50px'}}>
            차트 1
            <select style={{float:'right', width:'70%'}} className="form-select" onChange={(e) => {changeChartRendering(e.target.value)}} ref={select1Ref}>
              {
                selectOptions.map((option, index) => {
                  return <option key={option.id} value={option.id}>{option.name}</option>;
                })
              }
            </select>
          </div>
          <div style={{height:'50px'}}>
            차트 2
            <select style={{float:'right', width:'70%'}} className="form-select" onChange={(e) => {changeChartRendering2(e.target.value)}} ref={select2Ref}>
              {
                selectOptions2.map((option, index) => {
                  return <option key={option.id} value={option.id}>{option.name}</option>;
                })
              }
            </select>
          </div>
        </div>
      </div>
    <br />
    <div >
        <div style={chartDivStyle}>
          {renderChart}
        </div>
        <div style={chartDivStyle}>
          {renderChart2}
        </div>
      </div>
    </>
  );
};
export default NivoUserCustom;
