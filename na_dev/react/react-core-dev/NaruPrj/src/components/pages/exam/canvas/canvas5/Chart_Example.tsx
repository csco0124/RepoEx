import { useEffect, useState } from "react";
import SBarChart from "./components/SBarChart";
import RangeInput from "../components/RangeInput";
import SMultipleBarChart from "./components/SMultipleBarChart";
import SLineChart from "./components/SLineChart";
import SPieChart from "./components/SPieChart";

const Chart_Example = () => {    
    const getItem = (id:string,defaultValue:number):number => {
      // Localstorage 에 저장된 값 불러오기 (없으면 지정된 기본값 출력)
        const value = window.localStorage.getItem(id)
        if(value == null) {
          return defaultValue;
        }
        return parseInt(value);
    }

    // 차트 원소에 사용할 값을 localStorage 값이 있는 경우 그것으로 초기화. 없으면 default 값 출력.
    const [charta,setChartA] = useState(getItem("chartExample_valuea",1)); 
    const [chartb,setChartB] = useState(getItem("chartExample_valueb",2));
    const [chartc,setChartC] = useState(getItem("chartExample_valuec",3));
    const [chartd,setChartD] = useState(getItem("chartExample_valued",4));
    const [charte,setChartE] = useState(getItem("chartExample_valuee",5));

    // 차트에서 사용할 기본 테마 
    const defaultTheme = {
      gridLineWeakColor:"#aa666633",
      gridLineStrongColor:"#ff7777aa",
      textFillColor:"white",
      textStrokeColor:"black",
      barStrokeColor:"black",
      valueTextFillColor:"white",
      barPadding:30,
      padding:{
          top:10,
          bottom:30,
          left:10,
          right:10,
      },
    }

    useEffect(()=> {      
      return (()=> {
        // page 를 떠날 때, 상태값 localStorage 에 저장 
        window.localStorage.setItem("chartExample_valuea", charta.toString());        
        window.localStorage.setItem("chartExample_valueb", chartb.toString());        
        window.localStorage.setItem("chartExample_valuec", chartc.toString());        
        window.localStorage.setItem("chartExample_valued", chartd.toString());        
        window.localStorage.setItem("chartExample_valuee", charte.toString());        
      })
    })

    return (
        <article>
            <header>
                <h2>Chart Example</h2>
            </header>
            <hr className="border border-primary border-3 opacity-75" />
            <h3>barChart</h3>
            <h4>SBarChart</h4>
            <SBarChart 
                canvasid = "barChart"
                width = {600}
                height = {400}
                items={
                    [                        
                        {title:"홍길동",value:charta,color:"red"},
                        {title:"김삿갓",value:chartb,color:"blue"},
                        {title:"둘리",value:chartc,color:"orange"},
                        {title:"또치",value:chartd,color:"gray"},
                        {title:"구성애",value:charte,color:"green"},
                    ]
                }
                theme={ defaultTheme }
            />           
            <RangeInput default={charta} min={-100} max={100} step={0.1} unit="" callback={(value)=> {
              setChartA(value);
            }} />

            <RangeInput default={chartb} min={-100} max={100} step={0.1} unit="" callback={(value)=> {
              setChartB(value);
            }} />

            <RangeInput default={chartc} min={-100} max={100} step={0.1} unit="" callback={(value)=> {
              setChartC(value);
            }} />

            <RangeInput default={chartd} min={-100} max={100} step={0.1} unit="" callback={(value)=> {
              setChartD(value);
            }} />            

            <RangeInput default={charte} min={-100} max={100} step={0.1} unit="" callback={(value)=> {
              setChartE(value);
            }} />            

            <h4>SMultipleBarChart</h4>
            <SMultipleBarChart
              canvasid="multipleBarChart"
              width={600}
              height={400}
              items={[
                {title:"군산",values:[1.5, 2,5,10]}, 
                {title:"여수",values:[1,3,3,11]},
                {title:"서울",values:[5,7,10,22]},
                {title:"부산",values:[5,7,9,10]},
                {title:"대구",values:[9,45,23,1]}, 
              ]}
              chartData ={{
                title:"월간 판매량",
                items:[
                  {title:"감자", color:"blue"},
                  {title:"고구마", color:"green"},
                  {title:"참치", color:"orange"},
                  {title:"바나나", color:"red"},
                ],
                boxWidth:80
              }}
              theme={ defaultTheme }
            />
            <h3>Line Chart</h3>
            <h4>SLineChart</h4>
            <SLineChart 
              canvasid="LineChart1"
              width={600}
              height={400}
              items={
                [
                  {
                    title:"병아리",
                    values:[1, 1.2, 2.5, 3, 4, 2, 10, 11],
                    lineColor:"red"
                  },
                  {
                    title:"강아지",
                    values:[3.4, 4.4, 2, 1, 2, 3, 5.5, 6],
                    lineColor:"orange"
                  },
                  {
                    title:"송아지",
                    values:[2, 1, 3, 4, 2, 5, 4.4, 3.3],
                    lineColor:"blue"
                  },
                  {
                    title:"망아지",
                    values:[3, 4.8, 3.2, 4.4, 3, 4],
                    lineColor:"green"
                  },
                ]
              }

              info = {
                {
                  title:"라인차트",
                  descBoxWidth:100,
                  lineStyle:"normal"
                }
              }

              theme={ defaultTheme }
              />
            
            <SLineChart 
              canvasid="LineChart2"
              width={600}
              height={400}
              items={
                [
                  {
                    title:"병아리",
                    values:[1, 1.2, 2.5, 3, 4, 2, 10, 11],
                    lineColor:"red"
                  },
                  {
                    title:"강아지",
                    values:[3.4, 4.4, 2, 1, 2, 3, 5.5, 6],
                    lineColor:"orange"
                  },
                  {
                    title:"송아지",
                    values:[2, 1, 3, 4, 2, 5, 4.4, 3.3],
                    lineColor:"blue"
                  },
                  {
                    title:"망아지",
                    values:[3, 4.8, 3.2, 4.4, 3, 4],
                    lineColor:"green"
                  },
                ]
              }

              info = {
                {
                  title:"라인차트",
                  descBoxWidth:100,
                  lineStyle:"bezierCurve"
                }
              }

              theme={ defaultTheme }
              />

               
            <SLineChart 
              canvasid="LineChart3"
              width={600}
              height={400}
              items={
                [
                  {
                    title:"병아리",
                    values:[1, 1.2, 2.5, 3, 4, 2, 10, 11],
                    lineColor:"red"
                  },
                  {
                    title:"강아지",
                    values:[3.4, 4.4, 2, 1, 2, 3, 5.5, 6],
                    lineColor:"orange"
                  },
                  {
                    title:"송아지",
                    values:[2, 1, 3, 4, 2, 5, 4.4, 3.3],
                    lineColor:"blue"
                  },
                  {
                    title:"망아지",
                    values:[3, 4.8, 3.2, 4.4, 3, 4],
                    lineColor:"green"
                  },
                ]
              }

              info = {
                {
                  title:"라인차트",
                  descBoxWidth:100,
                  lineStyle:"quadraticCurve"
                }
              }

              theme={ defaultTheme }
              />

              <h2>PieChart</h2>

              <SPieChart
                canvasid="pichart"
                width={600}
                height={400}
                items={ [
                  {
                    title:"2019",
                    values:[
                      {title:"apple", value:100},
                      {title:"banana", value:120},
                      {title:"tomato", value:50},
                      {title:"mellon", value:20},
                    ]
                  },
                  {
                    title:"2020",
                    values:[
                      {title:"apple", value:150},
                      {title:"tomato", value:200},
                      {title:"mellon", value:210},
                    ]
                  },
                  {
                    title:"2021",
                    values:[
                      {title:"apple", value:100},
                      {title:"tomato", value:110},
                      {title:"lime", value:100},
                    ]
                  },
                  {
                    title:"2022",
                    values:[
                      {title:"apple", value:100},
                      {title:"tomato", value:110},
                      {title:"lime",value:200}
                    ]
                  },

                ]
                }
                chartData={ {
                  title:"pi chart",
                  boxWidth:100,
                  piStrokeColor:"black",
                  colors:{
                    "apple":"red",
                    "tomato":"orange",
                    "banana":"yellow",
                    "mellon":"green",
                    "lime":"lime",
                  }
                }
                } 
                theme={ defaultTheme }              
                />
        </article>
    )
}
export default Chart_Example;