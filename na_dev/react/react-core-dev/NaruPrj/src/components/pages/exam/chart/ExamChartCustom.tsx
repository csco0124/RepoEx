import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import date from "date-and-time";
import LineChart from "./chart-component/LineChart";
import BarChart from "./chart-component/BarChart";
import StackbarChart from "./chart-component/StackbarChart";
import VerticalStackbarChart from "./chart-component/VerticalStackbarChart";
import RadarChart from "./chart-component/RadarChart";

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const numberFormatter = (params:any) => {
	return isNaN(params.value) ? 0 : params.value;
}

const baseSelectOptions:Array<any> = [{id:'line', name:'Line Chart'},
	{id:'bar', name:'Bar Chart'},
	{id:'Stackbar', name:'Stackbar Chart'},
	{id:'VerticalStack', name:'VerticalStack Chart'},
	{id:'Radar', name:'Radar Chart'}
];

const gridColumnDefs = [
  { field: "Month", width: 100, editable: false},
  { field: "20s", width: 142, type:'numericColumn', valueFormatter: numberFormatter },
  { field: "30s", width: 142, type:'numericColumn', valueFormatter: numberFormatter },
  { field: "40s", width: 142, type:'numericColumn', valueFormatter: numberFormatter },
	{ field: "50s", width: 142, type:'numericColumn', valueFormatter: numberFormatter },
];
const selectOptions:Array<any> = [...baseSelectOptions]
const selectOptions2:Array<any> = [...baseSelectOptions]
const selectOptions3:Array<any> = [...baseSelectOptions]

const ExamChartCustom = () => {
	const gridDefaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      flex: 1
    };
  }, []);

	const gridRef = useRef<any>();
  const select1Ref = useRef<any>();
  const select2Ref = useRef<any>();
	const select3Ref = useRef<any>();
	const [gridLayout, setGridLayout] = useState<Layout[]>([]);

	const [gridRowData, setGridRowData] = useState([
		{ 'Month' : 202302, '20s' : 500, '30s' : 530, '40s' : 644, '50s' : 530},
		{ 'Month' : 202303, '20s' : 400, '30s' : 577, '40s' : 561, '50s' : 582},
		{ 'Month' : 202304, '20s' : 300, '30s' : 493, '40s' : 579, '50s' : 611},
		{ 'Month' : 202305, '20s' : 360, '30s' : 535, '40s' : 601, '50s' : 626},
		{ 'Month' : 202306, '20s' : 489, '30s' : 623, '40s' : 639, '50s' : 645},
  ]);

	const [renderChart1, setRenderChart1] = useState<JSX.Element>();
  const [renderChart2, setRenderChart2] = useState<JSX.Element>();
	const [renderChart3, setRenderChart3] = useState<JSX.Element>();

	const [chartName1, setChartName1] = useState<string>();
	const [chartName2, setChartName2] = useState<string>();
	const [chartName3, setChartName3] = useState<string>();

	const [chartLineData, setChartLineData] = useState<any>([]);
  const [chartBarData, setChartBarData] = useState<any>({});
  const [chartRadarData, setChartRadarData] = useState<any>({});
  
	useEffect(() => {
		initChartLineData();
    //changeLineData();
    changeBarData();
    changeRadarData();
    
    return () => {};
  }, []);

	useEffect(() => {
    changeChartRendering(select1Ref.current.value);
    changeChartRendering2(select2Ref.current.value);
		changeChartRendering3(select3Ref.current.value);
  }, [chartLineData, chartBarData]);

	const initChartLineData = () => {
		let initChartLineData = [];
		const { Month, ...key } = gridRowData[0];
		
		const lineDataKeyArr = Object.keys(key);
		for (const property of lineDataKeyArr) {
			initChartLineData.push({id: property, data: []});
		}
		setChartLineData(initChartLineData);
		changeLineData(initChartLineData);
	}

	const changeLineData = (paramLineData = chartLineData) => {
		const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Month - b.Month;
    });
    const lineDataArray = paramLineData.map((lineData:any) => {
      let resData:any = [];
      sortGridRowData.map((gridData:any) => {
        resData.push({x : gridData.Month, y : gridData[lineData.id]});
      });
      lineData.data = [...resData];
      return lineData;
    });
    setChartLineData(lineDataArray);
  }

  const changeBarData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Month - b.Month;
    });
		let barKeyArr:any[] = [];
    const barDataArray:any[] = sortGridRowData.map((gridData:any) => {
      const { Month, ...barKey } = gridData;
			barKeyArr = Object.keys(barKey);
      const tempData = {
        "country" : gridData.Month,
        ...barKey
      }
      return tempData;
    });
    setChartBarData({keys:barKeyArr, data:barDataArray});
  }

  const changeRadarData = () => {
    const sortGridRowData = [...gridRowData].sort(function (a, b) {
      return a.Month - b.Month;
    });
		let keyArr:any[] = [];
    const radarDataArray:any[] = sortGridRowData.map((gridData:any) => {
			const { Month, ...key } = gridData;
			keyArr = Object.keys(key);
      return gridData;
    });
		console.log('radarDataArray', radarDataArray);
    setChartRadarData({indexBy:"Month", keys:keyArr, data:radarDataArray});
  }

	const changeChartRendering = (value:string) => {
		const selectOption = selectOptions.find(e => e.id === value);
		setChartName1(selectOption.name);

    switch(value) {
      case 'line':
        setRenderChart1(<LineChart data={chartLineData} />);
        break;
      case 'bar':
				setRenderChart1(<BarChart data={chartBarData} />);
        break;
			case 'Stackbar':
				setRenderChart1(<StackbarChart data={chartBarData} />);
				break;
			case 'VerticalStack':
				setRenderChart1(<VerticalStackbarChart data={chartBarData} />);
				break;
      case 'Radar':
        setRenderChart1(<RadarChart data={chartRadarData} />);
        break;
      default:
        break;
    }
  }
  const changeChartRendering2 = (value:string) => {
		const selectOption = selectOptions2.find(e => e.id === value);
		setChartName2(selectOption.name);

    switch(value) {
      case 'line':
        setRenderChart2(<LineChart data={chartLineData} />);
        break;
      case 'bar':
        setRenderChart2(<BarChart data={chartBarData} />);
        break;
      case 'Stackbar':
        setRenderChart2(<StackbarChart data={chartBarData} />);
        break;
			case 'VerticalStack':
				setRenderChart2(<VerticalStackbarChart data={chartBarData} />);
				break;
      case 'Radar':
        setRenderChart2(<RadarChart data={chartRadarData} />);
        break;
      default:
        break;
    }
  }
	const changeChartRendering3 = (value:string) => {
		const selectOption = selectOptions3.find(e => e.id === value);
		setChartName3(selectOption.name);

    switch(value) {
      case 'line':
        setRenderChart3(<LineChart data={chartLineData} />);
        break;
      case 'bar':
        setRenderChart3(<BarChart data={chartBarData} />);
        break;
      case 'Stackbar':
        setRenderChart3(<StackbarChart data={chartBarData} />);
        break;
			case 'VerticalStack':
				setRenderChart3(<VerticalStackbarChart data={chartBarData} />);
				break;
      case 'Radar':
        setRenderChart3(<RadarChart data={chartRadarData} />);
        break;
      default:
        break;
    }
  }

	const gridChange = (layout:Layout[]) => {
		console.log('layout', layout);
		setGridLayout(layout);
  }

	const addRow = () => {
		
		let nextMonth = Number(date.format(date.addMonths(date.parse((""+gridRowData[0].Month), 'YYYYMM', true), 1), 'YYYYMM'));
    let addData = [{ Month: nextMonth, '20s' : 0, '30s' : 0, '40s' : 0, '50s' : 0}];
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
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">차트 사용자정의</h2>
        <ul className="location">
          <li>예제</li>
          <li>차트예제</li>
          <li>차트 사용자정의</li>
        </ul>
      </div>
      <div className="cont-item">
        <div className="cont-flex">
          <div className="flex3">            
            <h3 className="h3-title">연령대별 접속자 수</h3>
            <div className="ag-theme-alpine mt-3">
              <AgGridReact rowData={gridRowData.reverse()} columnDefs={gridColumnDefs} defaultColDef={gridDefaultColDef} ref={gridRef}></AgGridReact>
            </div>
            <div className="btn-area right mt-3">
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addRow}>로우 추가</button>
              <button type="button" className="btn btn-sm btn-primary" onClick={executeData}>적용</button>
            </div>
          </div>
          <div className="flex2 item-center">
            <div className="form-itme flex1">
              <dl>
                <dt>차트 1</dt>
                <dd>
                  <select className="form-select" onChange={(e) => {changeChartRendering(e.target.value)}} ref={select1Ref}>
                    {
                      selectOptions.map((option, index) => {
                        return <option key={option.id} value={option.id}>{option.name}</option>;
                      })
                    }
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>차트 2</dt>
                <dd>
                  <select className="form-select" onChange={(e) => {changeChartRendering2(e.target.value)}} ref={select2Ref}>
                    {
                      selectOptions2.map((option, index) => {
                        return <option key={option.id} value={option.id}>{option.name}</option>;
                      })
                    }
                  </select>
                </dd>
              </dl>
              <dl>
                <dt>차트 3</dt>
                <dd>
                  <select className="form-select" onChange={(e) => {changeChartRendering3(e.target.value)}} ref={select3Ref}>
                    {
                      selectOptions3.map((option, index) => {
                        return <option key={option.id} value={option.id}>{option.name}</option>;
                      })
                    }
                  </select>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ResponsiveReactGridLayout
            className="layout"
            rowHeight={30}
            cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
            onLayoutChange={(layout) => gridChange(layout)}
          >
          <div key="aaa" data-grid={{ i: "aaa", w: 6, h: 9,	x: 0, y: 0, minW: 5, minH: 8}}>
            <h3 className="h3-title">차트 1 [{chartName1}]</h3>
            <div className="graph-cont">{renderChart1}</div>
          </div>
          <div key="bbb" data-grid={{ i: "bbb", w: 6, h: 9,	x: 6, y: 0, minW: 5, minH: 8}}>
            <h3 className="h3-title">차트 2 [{chartName2}]</h3>
            <div className="graph-cont">{renderChart2}</div>
          </div>
          <div key="ccc" data-grid={{ i: "ccc", w: 6, h: 9,	x: 0, y: 6, minW: 5, minH: 8}}>
            <h3 className="h3-title">차트 3 [{chartName3}]</h3>
            <div className="graph-cont">{renderChart3}</div>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    </div>
  </div>
  );
};

export default ExamChartCustom;
