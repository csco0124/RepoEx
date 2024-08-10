import React from "react";
import styles from './NavermapsExam.module.css';

interface Props {
    navermaps: any;
    naverMap: any;
    mapTypeId: string;
    setMapTypeId: any;
}

const Button = (props: Props) => {

    const jeju = new props.navermaps.LatLng(33.3590628, 126.534361)
    const busan = new props.navermaps.LatLng(35.1797865, 129.0750194)
    const dokdo = new props.navermaps.LatLngBounds(
        new props.navermaps.LatLng(37.2380651, 131.8562652),
        new props.navermaps.LatLng(37.2444436, 131.8786475),
    )
    const seoul = new props.navermaps.LatLngBounds(
        new props.navermaps.LatLng(37.42829747263545, 126.76620435615891),
        new props.navermaps.LatLng(37.7010174173061, 127.18379493229875),
    )

    const buttons = [
        {
          typeId: props.navermaps.MapTypeId.NORMAL,
          text: '일반지도',
        },
        {
          typeId: props.navermaps.MapTypeId.TERRAIN,
          text: '지형도',
        },
        {
          typeId: props.navermaps.MapTypeId.SATELLITE,
          text: '위성지도',
        },
        {
          typeId: props.navermaps.MapTypeId.HYBRID,
          text: '겹쳐보기',
        },
    ];

    return (
    <div style={{ position: 'relative' }}>
        <button
        className={styles.defaultBtn}
        onClick={() => props.naverMap.panTo({ lat: 37.5666103, lng: 126.9783882 })}
        >
        시청으로 이동
        </button>
        <button
        className={styles.defaultBtn}
        onClick={() => console.log('center', props.naverMap.getCenter())}
        >
        현재 위치 로깅
        </button>
        {buttons.map((btn) => {
            return (
                <button
                className={styles.mapsBtn}
                key={btn.typeId}
                style={{
                    backgroundColor:
                    btn.typeId === props.mapTypeId ? '#2780E3' : 'white',
                    color: btn.typeId === props.mapTypeId ? 'white' : 'black',
                }}
                onClick={() => props.setMapTypeId(btn.typeId)}
                >
                {btn.text}
                </button>
            )
        })}
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.setCenter(jeju)
        }}
        >
        제주도로 setCenter
        </button>
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.setZoom(6, true)
        }}
        >
        6레벨로 setZoom
        </button>
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.fitBounds(dokdo)
        }}
        >
        독도로 fitBounds
        </button>
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.panTo(busan)
        }}
        >
        부산으로 panTo
        </button>
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.panToBounds(seoul)
        }}
        >
        서울로 panToBounds
        </button>
        <button
        className={styles.defaultBtn}
        onClick={(e) => {
            e.preventDefault()
            if (props.naverMap) props.naverMap.panBy(new props.navermaps.Point(10, 10))
        }}
        >
        panBy로 조금씩 이동하기
        </button>
    </div>
    )
}

export default Button;