import { ResponsiveNetwork } from '@nivo/network'

const NetworkChart = ({data}:any) => {
	
  return (
    <ResponsiveNetwork
        data={data}
        margin={{ top: 35, bottom: 0, right: 0, left: 0 }}
        linkDistance={(e:any)=>e.distance}
        centeringStrength={0.3}
        repulsivity={1.5}
        nodeSize={(n:any)=>n.size}
        activeNodeSize={(n:any)=>1.5*n.size}
        nodeColor={(e:any)=>e.color}
        nodeBorderWidth={1}
        nodeBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.8
                ]
            ]
        }}
        linkThickness={(n:any)=>2+2*n.target.data.height}
        linkBlendMode="multiply"
        motionConfig="wobbly"
    />
  );
}

export default NetworkChart;