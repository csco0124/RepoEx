import { useEffect, useMemo, useRef, useState } from "react";
import produce from "immer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  SubTitle,
  Tooltip,
  Filler,
  Legend,
  LineController,
  BarController,
  ChartOptions
} from "chart.js";
import {
  Chart,
  Line,
  Pie,
  Bar,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Bubble,
} from "react-chartjs-2";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { flushSync } from "react-dom";

interface datasetObjectType {
  label : string;
  fill? : boolean;
  data : number[];
  borderColor : string;
  backgroundColor : string;
};
export interface dataType {
  labels: number[];
  datasets: Array<datasetObjectType>;
};

interface selectOptionType {
  id:string;
  name:string
}

const chartDivStyle: React.CSSProperties = {
  float: "left",
  margin: "5px",
};

const selectOptions:Array<selectOptionType> = [
  {id:'line', name:'Line Chart'},
  {id:'bar', name:'Bar Chart'},
  {id:'bubble', name:'Bubble Chart'},
  {id:'area', name:'Area Chart'},
]
const selectOptions2:Array<selectOptionType> = [
  {id:'line', name:'Line Chart'},
  {id:'bar', name:'Bar Chart'},
  {id:'bubble', name:'Bubble Chart'},
  {id:'area', name:'Area Chart'},
]

const initChartOptions:ChartOptions<any> = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line Chart",
      font:{size: 16}
    },
    subtitle: {
      display: true,
      text: '년도별 영업이익',
      color: 'blue',
      font: {
        size: 12,
        family: 'tahoma',
        weight: 'normal',
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    }
  },
};
const initChartOptions2:ChartOptions<any> = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line Chart",
      font:{size: 16}
    },
    subtitle: {
      display: true,
      text: '년도별 영업이익',
      color: 'blue',
      font: {
        size: 12,
        family: 'tahoma',
        weight: 'normal',
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    }
  },
};

const initData: dataType = {
  labels : [],
  datasets: [
    {
      label: "Apple",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Google",
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Microsoft",
      data: [],
      borderColor: "rgb(53, 162, 000)",
      backgroundColor: "rgba(53, 162, 000, 0.5)",
    },
  ],
};

function ChartjsUserCustom() {
  ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,BarElement,ArcElement,RadialLinearScale,Title,SubTitle,Filler,Tooltip,Legend,LineController,BarController);
  let [renderChart, setRenderChart] = useState<JSX.Element>();
  let [renderChart2, setRenderChart2] = useState<JSX.Element>();
  let [data, setData] = useState<dataType>(initData);
  let [selectOption, setSelectOption] = useState<string>("");
  let [selectOption2, setSelectOption2] = useState<string>("");
  let [chartOptions, setChartOptions] = useState<ChartOptions<any>>(initChartOptions);
  let [chartOptions2, setChartOptions2] = useState<ChartOptions<any>>(initChartOptions2);
  const gridRef = useRef<any>();

  const [gridRowData, setGridRowData] = useState([
    { Year: 2022, Apple: 119437, Google: 74842, Microsoft:83383 },
    { Year: 2021, Apple: 108949, Google: 78714, Microsoft:69916 },
    { Year: 2020, Apple: 66288, Google: 41224, Microsoft:52595 },
    { Year: 2019, Apple: 63930, Google: 34231, Microsoft:42959 },
    { Year: 2018, Apple: 70898, Google: 27524, Microsoft:35058 },
    { Year: 2017, Apple: 61344, Google: 26178, Microsoft:29025 },
    { Year: 2016, Apple: 60024, Google: 23716, Microsoft:26078 },
  ]);
  const [gridColumnDefs, setgridColumnDefs] = useState([
    { field: "Year", width: 100, editable: false},
    { field: "Apple", width: 142 },
    { field: "Google", width: 142  },
    { field: "Microsoft", width: 142  }
  ]);
  const gridDefaultColDef = useMemo(() => {
    return {
      editable: true,
      //sortable: true,
      resizable: true,
      //filter: true,
      flex: 1
    };
  }, []);
  
  useEffect(() => {
    setSelectOption(selectOptions[0].id);
    setSelectOption2(selectOptions2[0].id);
    setRenderChart(changeChartTemplate(selectOptions[0].id, false));
    setRenderChart2(changeChartTemplate2(selectOptions2[0].id, false));
  }, []); 
  
  const changeChartRendering = (value:string) => {
    setSelectOption(value);
    let isFill = false;
    if(value === 'area'){
      isFill = true;
    }
    setRenderChart(changeChartTemplate(value, isFill));
  }
  const changeChartRendering2 = (value:string) => {
    setSelectOption2(value);
    let isFill = false;
    if(value === 'area'){
      isFill = true;
    }
    setRenderChart2(changeChartTemplate2(value, isFill));
  }

  const setChartData = () => {
    let nextData: dataType = produce(data, (draft) => {
      let labels: number[] = draft.labels;                // Year
      let apple: number[] = draft.datasets[0].data;       // Apple
      let google: number[] = draft.datasets[1].data;      // Google
      let microsoft: number[] = draft.datasets[2].data;   // Microsoft

      labels.length = 0;
      apple.length = 0;
      google.length = 0;
      microsoft.length = 0;
      gridRowData.map(gridObj => {
        labels.push(gridObj.Year);
        apple.push(gridObj.Apple);
        google.push(gridObj.Google);
        microsoft.push(gridObj.Microsoft);
      });
    });
    return nextData;
  }

  const changeChartTemplate = (value:string, isFille:boolean) => {
    const nextData = setChartData();
    setData(nextData);
    
    let renderData = reverseData(nextData, isFille);
    console.log('chartOptions', chartOptions);
    switch(value) {
      case 'line':
        chartOptions.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions({...chartOptions});
        return (<Line width={500} height={300} options={chartOptions} data={renderData} />);
      case 'bar':
        chartOptions.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions({...chartOptions});
        return (<Bar width={500} height={300} options={chartOptions} data={renderData} />);
      case 'bubble':
        chartOptions.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions({...chartOptions});
        return (<Bubble width={500} height={300} options={chartOptions} data={renderData} />);
      case 'area':
        chartOptions.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions({...chartOptions});
        return (<Line width={500} height={300} options={chartOptions} data={renderData} />);
      default:
        break;
    }
  }
  const changeChartTemplate2 = (value:string, isFille:boolean) => {
    const nextData = setChartData();
    setData(nextData);
    
    let renderData = reverseData(nextData, isFille);
    console.log('chartOptions2', chartOptions2);
    switch(value) {
      case 'line':
        chartOptions2.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions2({...chartOptions2});
        return (<Line width={500} height={300} options={chartOptions2} data={renderData} />);
      case 'bar':
        chartOptions2.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions2({...chartOptions2});
        return (<Bar width={500} height={300} options={chartOptions2} data={renderData} />);
      case 'bubble':
        chartOptions2.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions2({...chartOptions2});
        return (<Bubble width={500} height={300} options={chartOptions2} data={renderData} />);
      case 'area':
        chartOptions2.plugins.title.text = '영업이익 ' + value + " chart";
        setChartOptions2({...chartOptions2});
        return (<Line width={500} height={300} options={chartOptions2} data={renderData} />);
      default:
        break;
    }
  }

  const reverseData = (renderData:dataType, isFill:boolean) => {
    let nextData: dataType = produce(renderData, (draft) => {
      draft.labels = draft.labels.reverse();
      draft.datasets[0].data = draft.datasets[0].data.reverse();
      draft.datasets[1].data = draft.datasets[1].data.reverse();
      draft.datasets[2].data = draft.datasets[2].data.reverse();

      draft.datasets[0].fill = isFill;
      draft.datasets[1].fill = isFill;
      draft.datasets[2].fill = isFill;
    });
    return nextData;
  }

  const addRow = () => {
    let nextYear = (gridRowData[0].Year)+1;
    let addData = [{ Year: nextYear, Apple: 0, Google: 0, Microsoft: 0}];
    setGridRowData([...addData, ...gridRowData]);
  }

  const executeData = () => {
    gridStopEdit();
    setRenderChart(changeChartTemplate(selectOption, true));
    setRenderChart2(changeChartTemplate2(selectOption2, true));
  }

  const gridStopEdit = () => {
    let api:any = gridRef.current.api;
    api.stopEditing(false);
  }

  return (
    <>
      <hr/>
      <div className="row">
        <div className="col-8">
          <div className="ag-theme-alpine" style={{ height: 200, width: 550, float:"left", marginRight:"15px" }} >
          <div style={{textAlign:"center"}}><b>미국3대 IT 년도별 영업이익 [단위 : 백만달러(USD)]</b></div>
            <AgGridReact rowData={gridRowData} columnDefs={gridColumnDefs} defaultColDef={gridDefaultColDef} ref={gridRef}></AgGridReact>
          </div>
          <div style={{float:"left" }}>
              <button onClick={addRow}>로우 추가</button><br />
              <button onClick={executeData}>적용</button>
          </div>
        </div>
        <div className="col-4">
          <div style={{height:'50px'}}>
            차트 1
            <select style={{float:'right', width:'70%'}} className="form-select" onChange={(e) => {changeChartRendering(e.target.value)}} >
              {
                selectOptions.map((option, index) => {
                  return <option key={option.id} value={option.id}>{option.name}</option>;
                })
              }
            </select>
          </div>
          <div style={{height:'50px'}}>
            차트 2
            <select style={{float:'right', width:'70%'}} className="form-select" onChange={(e) => {changeChartRendering2(e.target.value)}} >
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
}

export default ChartjsUserCustom;