import { ResponsiveTimeRange } from '@nivo/calendar'

const TimeRangeChart = ({data}:any) => {
  return (
    <ResponsiveTimeRange
        data={data}
        from="2022-12-31"
        to="2023-06-01"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 50, right: 10, bottom: 70, left: 20 }}
        dayBorderWidth={2}
				dayRadius={5}
				minValue={0}
				maxValue={300}
				square={false}
				weekdayLegendOffset={60}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -60,
                translateY: -70,
                symbolSize: 20
            }
        ]}
    />
  );
}

export default TimeRangeChart;