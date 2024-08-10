//import { NaverMap, Marker, useNavermaps } from 'react-naver-maps'
import React, { useState, useRef } from 'react';
import {
  Container as MapDiv, 
  NaverMap,
  useNavermaps,
  Overlay,
  useListener,
  Listener,
  useMap,
} from 'react-naver-maps';

function MyMarkers() {
  const navermaps = useNavermaps()

  // 마커를 한번만 생성하기 위해 useState lazy initialize 사용
  const [marker1] = useState(
    () =>
      new navermaps.Marker({
        position: { lat: 37.5666103, lng: 126.9783882 },
      }),
  )

  // 마커를 한번만 생성하기 위해 useRef 사용
  const marker2Ref = useRef(null)
  if (!marker2Ref.current) {
    marker2Ref.current = new navermaps.Marker({
      position: { lat: 37.5657259, lng: 126.97547 },
    })
  }
  //const marker2 = marker2Ref.current

  // hook 으로 이벤트 리스너 등록
  useListener(marker1, 'click', () => window.alert('서울시청 click'))

  // return (
  //   <>
  //     <Overlay element={marker1} />
  //     <Overlay element={marker2}>
  //       {/* Component 로 이벤트 리스너 등록 */}
  //       <Listener
  //         type="click"
  //         listener={() => window.alert('덕수궁 click')}
  //       />
  //     </Overlay>
  //   </>
  // )

  return (
    <>
      <Overlay element={marker1} />
    </>
  )
}

function Buttons() {
  // Map의 instance를 가져옵니다.
  const naverMap = useMap()

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button
        className='btn btn-sm btn-primary'
        onClick={() => {
          naverMap.panTo({ lat: 37.5666103, lng: 126.9783882 })
        }}
      >
        시청으로 이동
      </button>
      <button
        className='btn btn-sm btn-primary'
        onClick={() => {
          console.log('center', naverMap.getCenter())
        }}
      >
        현재 위치 로깅
      </button>
    </div>
  )
}


const Map = () => {
  // instead of window.naver.maps
  const navermaps = useNavermaps()

  return (
    <MapDiv style={{ width: '100%', height: '90%', }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={15}
      >
        {/* <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} /> */}
        <MyMarkers />
        <Buttons />
      </NaverMap>
    </MapDiv>
  )
}

export default Map;

// 참고 사이트 1. https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html - jquery
//            2. https://zeakd.github.io/react-naver-maps/ - React

