import React, { useState, useRef } from "react";
import { Overlay, useListener, Listener } from 'react-naver-maps';

interface Props {
    navermaps: any;
}

const Marker = (props: Props) => {
    // 마커를 한번만 생성하기 위해 useState lazy initialize 사용
  const [marker1] = useState(
    () =>
      new props.navermaps.Marker({
        position: { lat: 37.5666103, lng: 126.9783882 },
      }),
  )

  // 마커를 한번만 생성하기 위해 useRef 사용
  const marker2Ref = useRef(null)
  if (!marker2Ref.current) {
    marker2Ref.current = new props.navermaps.Marker({
      position: { lat: 37.5657259, lng: 126.97547 },
    })
  }
  const marker2 = marker2Ref.current

  // hook 으로 이벤트 리스너 등록
  useListener(marker1, 'click', () => window.alert('서울시청 click'))

  return (
    <>
      <Overlay element={marker1} />
      {marker2 && (
        <Overlay element={marker2}>
        {/* Component 로 이벤트 리스너 등록 */}
        <Listener
          type="click"
          listener={() => window.alert('덕수궁 click')}
        />
        </Overlay>
      )}
    </>
  )
}

export default Marker;