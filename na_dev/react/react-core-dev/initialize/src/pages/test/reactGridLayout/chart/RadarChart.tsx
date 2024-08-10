import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = (props:any) => {
  return (
    <ResponsiveRadar
        data={props.data.data}
        keys={props.data.keys}
        indexBy={props.data.indexBy ? props.data.indexBy : "Month"}
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={10}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={0.5}
        borderWidth={0.5}
        fillOpacity={0.3}
        colors={{ scheme: 'dark2' }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
  );
}

export default RadarChart;