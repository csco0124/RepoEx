import React, { useState } from 'react';
import { 
  Container as MapDiv,
  NaverMap,
  useNavermaps,
} from 'react-naver-maps';
import MenuDepth from "../../../common/MenuDepth";
import Button from './Button';
import Marker from './Marker';

const NavermapsExam = () => {
  const navermaps = useNavermaps();
  const [mapTypeId, setMapTypeId] = useState(navermaps.MapTypeId.NORMAL);
  const center = new navermaps.LatLng(37.5666805, 126.9784147)
  // useRef 대신 useState를 통해 ref를 가져옵니다.
  const [map, setMap] = useState(null)

  return(
    <div className="content">
      <MenuDepth />
      <div className="form-check form-switch">
      </div>
        <Button navermaps={navermaps} naverMap={map} mapTypeId={mapTypeId} setMapTypeId={setMapTypeId}/>
        <MapDiv style={{ width: '100%', height: '500px' }}>
          <NaverMap 
            disableKineticPan={false}
            mapTypeId={mapTypeId}
            defaultCenter={center}
            defaultZoom={9}
            ref={setMap}
          >
            <Marker navermaps={navermaps}/>
          </NaverMap>
        </MapDiv>
        {/* <div className='mt-5' style={{ textAlign: 'center' }}>
          <input type="text" defaultValue="" style={{ width: '80%', height: '40px' }} /><button className="btn btn-sm btn-primary">검색</button>
        </div>    */}
    </div>
  );
}

export default NavermapsExam;

/*
  *** NaverMap 속성

  disableKineticPan : 관성 드래깅 (false일때 적용, true 미적용)

*/ 