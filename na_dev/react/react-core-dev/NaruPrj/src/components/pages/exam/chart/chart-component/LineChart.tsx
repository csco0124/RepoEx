import { ResponsiveLine } from "@nivo/line";

const LineChart = (props:any) => {
  return (
    <ResponsiveLine
                data={props.data}
                margin={{ top: 20, right: 30, bottom: 80, left: 55 }}
                xScale={{ type: 'point' }}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false  
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  //orient: 'bottom',
                  tickSize: 3,
                  tickPadding: 3,
                  tickRotation: 0,
                  legend: 'Month',
                  legendOffset: 35,
                  legendPosition: 'middle'
              }}
              axisLeft={{
                  //orient: 'left',
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Count',
                  legendOffset: -45,
                  legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                  {
                      anchor: 'bottom',
                      direction: 'row',
                      justify: false,
                      translateX: 0,
                translateY: 70,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemBackground: 'rgba(0, 0, 0, .03)',
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
            />
  );
}

export default LineChart;