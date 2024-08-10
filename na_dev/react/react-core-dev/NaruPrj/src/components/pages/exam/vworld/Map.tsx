import React, { useState, useEffect } from 'react'
import MapContext from './MapContext'
import 'ol/ol.css'
import { Map as OlMap, View } from 'ol'
import { defaults as defaultControls, FullScreen, } from 'ol/control'
import { fromLonLat, get as getProjection, ProjectionLike } from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import { XYZ } from 'ol/source'
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction'

interface Props {
  xyArray: [],
}

const Map = ({ children }: any, props: Props) => {
  const [mapObj, setMapObj] = useState({})

  useEffect(() => {
  //Map 객체 생성 및 vworld 지도 설정
    const map = new OlMap({
      controls: defaultControls({ zoom: false, rotate: false }).extend([
        new FullScreen(),
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [
        new TileLayer({
          source: new XYZ({ //인증키는 vworld에서 발급 가능
            url: 'http://api.vworld.kr/req/wmts/2.0.0/133F4A0B-CF61-3981-8650-D3E32AF4353D/Base/{z}/{y}/{x}.png',
          }),
        }),
      ],
      target: 'map',
      view: new View({
        projection: getProjection('EPSG:3857') as ProjectionLike,
        center: fromLonLat(
          props.xyArray != undefined &&  props.xyArray.length != 0? props.xyArray : 
          [126.9779228388393, 37.56643948208262], //[경도, 위도] 값 설정! 필자는 시청으로 설정
          getProjection('EPSG:3857') as ProjectionLike
        ),
        zoom: 15,
      }),
    })

    setMapObj({ map })
    return () => map.setTarget(undefined)
  }, [])

  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>
}

export default Map