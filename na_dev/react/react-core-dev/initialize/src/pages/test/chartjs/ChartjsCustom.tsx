import { useState} from "react";
import produce from "immer";
import $api from "../../../common/CommonAxios";
import useInterval from "../../../common/useInterval"

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
  Tooltip,
  Legend,
  LineController,
  BarController
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
import { lineDataType,lineOptions,lineInitData } from "./../chartjsCommon/LineCommon";
import { bubbleDataType, bubbleDataObjectType, bubbleOptions,bubbleInitData } from "./../chartjsCommon/BubbleCommon";
import { barDataObjectType, barOptions, barInitData } from "./../chartjsCommon/BarCommon";
import { multitypeOptions, multitypeInitData } from "./../chartjsCommon/MultitypeCommon";
import { pieOptions, pieInitData } from "./../chartjsCommon/PieCommon";
import { radarOptions, radarInitData } from "./../chartjsCommon/RadarCommon";

const chartDivStyle: React.CSSProperties = {
  float: "left",
  margin: "5px",
};

const Chartjs = () => {
  let [lineData, setLineData] = useState<lineDataType>(lineInitData);
  let [bubbleData, setBubbleData] = useState<bubbleDataObjectType>(bubbleInitData);
  let [barData, setBarData] = useState<barDataObjectType>(barInitData);
  let [multitypeData, setMultitypeData] = useState<any>(multitypeInitData);
  let [pieData, setPieData] = useState<any>(pieInitData);
  let [radarData, setRadarData] = useState<any>(radarInitData);
  
  /*
  const lineDataRef = useRef(lineData);
  lineDataRef.current = lineData;

  const getLineDataShiftTimeout = () => {
    setTimeout(() => {
      
      let lineData = lineDataRef.current;
      let labels: number[] = [...lineData.labels];
      let dataset1: number[] = [...lineData.datasets[0].data];
      let dataset2: number[] = [...lineData.datasets[1].data];
      let dataset3: number[] = [...lineData.datasets[2].data];

      labels.shift();
      dataset1.shift();
      dataset2.shift();
      dataset3.shift();

      let newLineData:any = {...lineInitData};
      newLineData.labels = [...labels];
      newLineData.datasets[0].data = [...dataset1];
      newLineData.datasets[1].data = [...dataset2];
      newLineData.datasets[2].data = [...dataset3];
      setLineData(newLineData);
    }, 500);
  };
  */

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController
  );

  useInterval(() => {
    //dataChange();
  }, 1000);

  const dataChange = () => {
    lineChartDataChange();
    bubbleChartDataChange();
    multitypeChartDataChange();
    barChartDataChange();
    pieChartDataChange();
    radarChartDataChange();
  };

  const lineChartDataChange = () => {
    $api.post("/api/test/custom/get_line_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataset1Result: number = response.data.dataset1;
          let dataset2Result: number = response.data.dataset2;
          let dataset3Result: number = response.data.dataset3;

          let nextData: lineDataType = produce(lineData, (draft) => {
            
            let labels: number[] = draft.labels;
            let dataset1: number[] = draft.datasets[0].data;
            let dataset2: number[] = draft.datasets[1].data;
            let dataset3: number[] = draft.datasets[2].data;

            labels.shift();
            dataset1.shift();
            dataset2.shift();
            dataset3.shift();

            labels.push(labels[labels.length - 1] + 100);
            dataset1.push(dataset1Result);
            dataset2.push(dataset2Result);
            dataset3.push(dataset3Result);
            
            
            //getLineDataShiftTimeout();
          });
          setLineData(nextData);
        })
  };

  const multitypeChartDataChange = () => {
    $api.post("/api/test/custom/get_multitype_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataset1Result: number[] = response.data.dataset1;
          let dataset2Result: number[] = response.data.dataset2;
          let dataset3Result: number[] = response.data.dataset3;

          let nextData: any = produce(multitypeData, (draft:any) => {
            let dataset1: number[] = draft.datasets[0].data;
            let dataset2: number[] = draft.datasets[1].data;
            let dataset3: number[] = draft.datasets[2].data;

            dataset1.length = 0;
            dataset2.length = 0;
            dataset3.length = 0;
            dataset1.push(...dataset1Result);
            dataset2.push(...dataset2Result);
            dataset3.push(...dataset3Result);
          });
          setMultitypeData(nextData);
        })
  };

  const bubbleChartDataChange = () => {
    $api.post("/api/test/custom/get_bubble_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataset1Result: bubbleDataType = response.data[0];
          let dataset2Result: bubbleDataType = response.data[1];
          let dataset3Result: bubbleDataType = response.data[2];

          let nextData: bubbleDataObjectType = produce(bubbleData, (draft) => {
            let dataset1: bubbleDataType[] = draft.datasets[0].data;
            let dataset2: bubbleDataType[] = draft.datasets[1].data;
            let dataset3: bubbleDataType[] = draft.datasets[2].data;

            //dataset1.shift();
            //dataset2.shift();
            //dataset3.shift();

            dataset1.push(dataset1Result);
            dataset2.push(dataset2Result);
            dataset3.push(dataset3Result);
          });
          setBubbleData(nextData);
        })
  };

  const barChartDataChange = () => {
    $api.post("/api/test/custom/get_bar_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataset1Result: number[] = response.data.dataset1;
          let dataset2Result: number[] = response.data.dataset2;

          let nextData: barDataObjectType = produce(barData, (draft:any) => {
            let dataset1: number[] = draft.datasets[0].data;
            let dataset2: number[] = draft.datasets[1].data;
            
            //dataset1.shift();
            //dataset2.shift();
            dataset1.length = 0;
            dataset2.length = 0;
            dataset1.push(...dataset1Result);
            dataset2.push(...dataset2Result);
          });
          setBarData(nextData);
        })
  };

  const pieChartDataChange = () => {
    $api.post("/api/test/custom/get_pie_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataResult: number[] = response.data.data;

          let nextData: any = produce(pieData, (draft:any) => {
            let data: number[] = draft.datasets[0].data;
            data.length = 0;
            data.push(...dataResult);
          });
          console.log(nextData);
          setPieData(nextData);
        })
  };

  const radarChartDataChange = () => {
    $api.post("/api/test/custom/get_radar_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataResult1: number[] = response.data.data1;
          let dataResult2: number[] = response.data.data2;
          let dataResult3: number[] = response.data.data3;

          let nextData: any = produce(radarData, (draft:any) => {
            let data1: number[] = draft.datasets[0].data;
            let data2: number[] = draft.datasets[1].data;
            let data3: number[] = draft.datasets[2].data;
            data1.length = 0;
            data2.length = 0;
            data3.length = 0;
            data1.push(...dataResult1);
            data2.push(...dataResult2);
            data3.push(...dataResult3);
          });
          
          setRadarData(nextData);
        })
  };

  return (
    <div>
      <Link to="/test">Sample/Test 홈으로</Link>
      <br />
      <a href="https://www.chartjs.org/docs/latest/" target="_blank">https://www.chartjs.org/docs/latest/</a>
      <br />
      <button onClick={dataChange}>데이터 변경</button>
      <br />
      <div style={chartDivStyle}>
        <Line width={500} height={300} options={lineOptions} data={lineData} />
      </div>
      <div style={chartDivStyle}>
        <Bubble width={500} height={300} options={bubbleOptions} data={bubbleData} />
      </div>
      <div style={chartDivStyle}>
        <Chart width={500} height={300} type='bar' options={multitypeOptions} data={multitypeData} />
      </div>
      <div style={chartDivStyle}>
        <Bar width={500} height={300} options={barOptions} data={barData} />
      </div>
      <div style={{width: '500px',...chartDivStyle}}>
        <div style={{width:"300px", margin: 'auto'}}>
          <Pie options={pieOptions} data={pieData} />
        </div>
      </div>
      <div style={{width: '500px',...chartDivStyle}}>
        <div style={{width:"400px", margin: 'auto'}}>
        <Radar options={radarOptions} data={radarData} />
        </div>
      </div>
    </div>
  );
};
export default Chartjs;
