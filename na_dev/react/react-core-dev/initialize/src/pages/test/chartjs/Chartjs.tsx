import { useEffect, useState, Dispatch, SetStateAction } from "react";
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
} from "chart.js";
import {
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
import {
  dataType,
  options,
  initData,
} from "./../chartjsCommon/ChartjsCommon";

const chartDivStyle: React.CSSProperties = {
  float: "left",
};

const Chartjs = () => {
  let [data1, setData1] = useState<dataType>(initData);
  let [data2, setData2] = useState<dataType>(initData);
  let [data3, setData3] = useState<dataType>(initData);
  let [data4, setData4] = useState<dataType>(initData);
  let [data5, setData5] = useState<dataType>(initData);
  let [data6, setData6] = useState<dataType>(initData);
  let [data7, setData7] = useState<dataType>(initData);
  let [data8, setData8] = useState<dataType>(initData);
  let [data9, setData9] = useState<dataType>(initData);
  let [data10, setData10] = useState<dataType>(initData);
  let [data11, setData11] = useState<dataType>(initData);
  let [data12, setData12] = useState<dataType>(initData);



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
    Legend
  );

  useInterval(() => {
    dataChange();
  }, 1000);

  useEffect(() => {
    
  }, []);

  const dataChange = () => {
    chartDataChange(data1, setData1);
    chartDataChange(data2, setData2);
    chartDataChange(data3, setData3);
    chartDataChange(data4, setData4);
    chartDataChange(data5, setData5);
    chartDataChange(data6, setData6);
    chartDataChange(data7, setData7);
    chartDataChange(data8, setData8);
    chartDataChange(data9, setData9);
    chartDataChange(data10, setData10);
    chartDataChange(data11, setData11);
    chartDataChange(data12, setData12);
  };

  const chartDataChange = (
    dataObject: dataType,
    setDataObject: Dispatch<SetStateAction<dataType>>
  ) => {
    $api.post("/api/test/get_chartjs_data", {}, {headers: {isLoading: false}})
        .then(response => {
          let dataset1Result: number = response.data.dataset1;
          let dataset2Result: number = response.data.dataset2;

          let nextData: dataType = produce(dataObject, (draft) => {
            let labels: number[] = draft.labels;
            let dataset1: number[] = draft.datasets[0].data;
            let dataset2: number[] = draft.datasets[1].data;

            labels.shift();
            dataset1.shift();
            dataset2.shift();

            labels.push(labels[labels.length - 1] + 100);
            dataset1.push(dataset1Result);
            dataset2.push(dataset2Result);
          });
          setDataObject(nextData);
        })
        .catch(error => {
          // 오류발생시 실행
          console.log("오류발생", error);
        });
  };

  return (
    <div>
      <Link to="/test">Sample/test 홈으로</Link>
      <br />
      <a href="https://www.chartjs.org/docs/latest/" target="_blank">https://www.chartjs.org/docs/latest/</a>
      <br />
      {/* <button onClick={dataChange}>데이터 변경</button> */}
      <br />
      <div style={chartDivStyle}>
        <Line width={400} height={200} options={options} data={data1} />
      </div>
      <div style={chartDivStyle}>
        <Pie width={400} height={200} options={options} data={data2} />
      </div>
      <div style={chartDivStyle}>
        <Bar width={400} height={200} options={options} data={data3} />
      </div>
      <div style={chartDivStyle}>
        <Doughnut width={400} height={200} options={options} data={data4} />
      </div>
      <div style={chartDivStyle}>
        <PolarArea width={400} height={200} options={options} data={data5} />
      </div>
      <div style={chartDivStyle}>
        <Radar width={400} height={200} options={options} data={data6} />
      </div>
      <div style={chartDivStyle}>
        <Scatter width={400} height={200} options={options} data={data7} />
      </div>
      <div style={chartDivStyle}>
        <Bubble width={400} height={200} options={options} data={data8} />
      </div>
      <div style={chartDivStyle}>
        <Bar width={400} height={200} options={options} data={data9} />
      </div>
      <div style={chartDivStyle}>
        <Bar width={400} height={200} options={options} data={data10} />
      </div>
      <div style={chartDivStyle}>
        <Line width={400} height={200} options={options} data={data11} />
      </div>
      <div style={chartDivStyle}>
        <Line width={400} height={200} options={options} data={data12} />
      </div>
    </div>
  );
};
export default Chartjs;
