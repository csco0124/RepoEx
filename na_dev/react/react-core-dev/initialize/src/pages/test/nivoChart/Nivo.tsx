import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BarDatum } from "@nivo/bar";
import { BumpDatum } from "@nivo/bump";
import { Link } from "react-router-dom";
import { barDataInit, bumpDataInit } from "../nivoChartCommon/NivoCommon";
import ResponsiveBarChart from "./ResponsiveBarChart";
import ResponsiveBumpChart from "./ResponsiveBumpChart";
import $api from "../../../common/CommonAxios";
import produce from "immer";
import useInterval from "../../../common/useInterval";

const chartDivStyle: React.CSSProperties = {
  float: "left",
  width: "400px",
  height: "300px",
  margin: "0 auto",
};

const Nivo = () => {
  let [data1, setData1] = useState<BarDatum[]>(barDataInit);
  let [data2, setData2] = useState<any>(bumpDataInit);

  let [data3, setData3] = useState<BarDatum[]>(barDataInit);
  let [data4, setData4] = useState<any>(bumpDataInit);

  let [data5, setData5] = useState<BarDatum[]>(barDataInit);
  let [data6, setData6] = useState<any>(bumpDataInit);

  let [data7, setData7] = useState<BarDatum[]>(barDataInit);
  let [data8, setData8] = useState<any>(bumpDataInit);

  let [data9, setData9] = useState<BarDatum[]>(barDataInit);
  let [data10, setData10] = useState<any>(bumpDataInit);

  useInterval(() => {
    chartDataChange();
  }, 1000);

  useEffect(() => {

    // unmount
    return () => {};
  }, []);

  const chartDataChange = () => {
    barDataChange(data1, setData1);
    bumpDataChange(data2, setData2);

    barDataChange(data3, setData3);
    bumpDataChange(data4, setData4);

    barDataChange(data5, setData5);
    bumpDataChange(data6, setData6);

    barDataChange(data7, setData7);
    bumpDataChange(data8, setData8);

    barDataChange(data9, setData9);
    bumpDataChange(data10, setData10);
  };

  const barDataChange = (dataObject:BarDatum[], setDataObject: Dispatch<SetStateAction<BarDatum[]>>) => {
    $api.post("/api/test/get_nivo_bar_data", {})
      .then(response => {
        setDataObject([...response.data]);
      })
      .catch(error => {
        // 오류발생시 실행
        console.log("오류발생", error);
      });
  };

  const bumpDataChange = (dataObject:any, setDataObject: Dispatch<SetStateAction<any>>) => {
    let nextYear: number = dataObject[0].data[4].x + 1;

    $api
      .post("/api/test/get_nivo_bump_data", {
        nextYear: nextYear,
      }, {headers: {isLoading: false}})
      .then(response => {
        
        let nextData: any = produce(dataObject, (draft: { data: any }[]) => {
          for (let i = 0; i < 3; i++) {
            //console.log(draft[i].data);
            let data: any = draft[i].data;
            data.shift();
            data.push(response.data[i]);
          }
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
      <Link to="/test">Sample/Test 홈으로</Link>
      <br />
      <a href="https://nivo.rocks/" target="_blank">https://nivo.rocks/</a>
      <br />

      <div style={chartDivStyle}>
        <ResponsiveBarChart data={data1} />
      </div>
      <div style={chartDivStyle}>
        <ResponsiveBumpChart data={data2} />
      </div>

      <div style={chartDivStyle}>
        <ResponsiveBarChart data={data3} />
      </div>
      <div style={chartDivStyle}>
        <ResponsiveBumpChart data={data4} />
      </div>

      <div style={chartDivStyle}>
        <ResponsiveBarChart data={data5} />
      </div>
      <div style={chartDivStyle}>
        <ResponsiveBumpChart data={data6} />
      </div>

      <div style={chartDivStyle}>
        <ResponsiveBarChart data={data7} />
      </div>
      <div style={chartDivStyle}>
        <ResponsiveBumpChart data={data8} />
      </div>

      <div style={chartDivStyle}>
        <ResponsiveBarChart data={data9} />
      </div>
      <div style={chartDivStyle}>
        <ResponsiveBumpChart data={data10} />
      </div>

    </div>
  );
};
export default Nivo;
