import { ResponsiveChoropleth } from '@nivo/geo'
import countries from "./map.geo.json";

const MapChart = (props:any) => {
	return (
    <div style={{width:"600px", height:"600px"}}>

        <ResponsiveChoropleth
          data={props.data ? props.data : [{"id": "11","value": 100}, {"id": "21","value": 50}, {"id": "31","value": 81}, {"id": "37","value": 31}, {"id": "39","value": 1}]}
          features={countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          projectionScale={3900}
          projectionTranslation={[-14, 4.8]}
          projectionRotation={[ 0, 0, 0 ]}
          domain={[ 0, 100 ]}
          unknownColor="#fff"
          label="properties.name"
          valueFormat=".2s"
          enableGraticule={false}
          graticuleLineColor="#dddddd"
          borderWidth={0.5}
          borderColor="#152538"
          legends={[
              {
                  anchor: 'bottom-left',
                  direction: 'column',
                  justify: true,
                  translateX: 20,
                  translateY: -100,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemTextColor: '#444444',
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000000',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
        />
      
    </div>
  );
}

export default MapChart;