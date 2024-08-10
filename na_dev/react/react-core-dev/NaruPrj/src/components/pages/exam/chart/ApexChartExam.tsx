import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const gridStyle : React.CSSProperties = {
	overflowX : "hidden",
	overflowY : "auto",
	width : "100%",
	height : "95%",
	marginBottom:"30px"
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ApexChartExam = () => {
	const [gridLayout, setGridLayout] = useState<Layout[]>([]);

  const [barChartDef, getBarChartDef] = useState<any>({
    series: [{
			data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
		}],
		options: {
			chart: {
				type: 'bar',
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					horizontal: true,
				}
			},
			dataLabels: {
				enabled: false
			},
			xaxis: {
				categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
					'United States', 'China', 'Germany'
				],
			}
		},
	});

	const [areaChartDef, getAreaChartDef] = useState<any>({
		series: [
			{name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
			{name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] }
		],
		options: {
			chart: {width: '100%', type: 'area'},
			dataLabels: {enabled: false},
			stroke: {curve: 'smooth'},
			xaxis: {
				type: 'datetime',
				categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
			},
			tooltip: { 
				x: {format: 'dd/MM/yy HH:mm'} 
			},
		}
	});

	const gridChange = async (layout:Layout[]) => {
		console.log('layout', layout);
		setGridLayout(layout);
  }

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">APEX CHART 모음 <a className="text-success" href="https://apexcharts.com" target="_blank">(apexcharts.com)</a></h2>
        <ul className="location">
          <li>예제</li>
          <li>차트예제</li>
          <li>Apex차트예제</li>
        </ul>
      </div>
      <div className="cont-flex">
				<ResponsiveReactGridLayout
					className="layout"
					rowHeight={30}
					cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
					onLayoutChange={(layout) => gridChange(layout)}
				>
					<div className="cont-item flex1" key="aaa" data-grid={{ i: "aaa", w: 4, h: 8,	x: 0, y: 0, minW: 4, minH: 8}}>
						<div className="title-item">
            	<h3 className="h3-title">bar Chart</h3>
            </div>
						<div style={gridStyle}>
							<div>
								<ReactApexChart options={barChartDef.options} series={barChartDef.series} type="bar" />
							</div>
						</div>
					</div>
					<div className="cont-item flex1" key="bbb" data-grid={{ i: "bbb", w: 4, h: 8,	x: 4, y: 0, minW: 4, minH: 8}}>
						<div className="title-item">
            	<h3 className="h3-title">Area Chart</h3>
            </div>
						<div style={gridStyle} >
							<div>
								<ReactApexChart options={areaChartDef.options} series={areaChartDef.series} type="area"/>
							</div>
						</div>
					</div>
				</ResponsiveReactGridLayout>
      </div>
    </div>
  );
};

export default ApexChartExam;