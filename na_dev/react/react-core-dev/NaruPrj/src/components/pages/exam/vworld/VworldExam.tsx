import React, { useEffect, useState } from "react";
//import React, { useState, useContext } from "react";
import MenuDepth from "../../../common/MenuDepth";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
//import MapContext from "./MapContext";
import Map from "./Map";
import { InputChangeEvent } from "../../../common/InputText";

const VworldExam = () => {
  const ResponsiveReactGridLayout = WidthProvider(Responsive);
  const [gridLayout, setGridLayout] = useState<Layout[]>([]);
  const [isDraggable, setIsDraggable] = useState(false);
  const [xyArray, setXyArray] = useState({});
  //const { Map } = useContext(MapContext);

  const gridChange = (layout: Layout[]) => {
    console.log('layout', layout);
    //setGridLayout(layout);
  };

  const draghandler = (event: InputChangeEvent) => {
    setIsDraggable(!isDraggable);
  }

  function geocoding(url: string) {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonpCallback';
    
        // 콜백 함수를 전역 범위로 정의
        (window as any)[callbackName] = (data: any) => {
        resolve(data);
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        };
    
        const script = document.createElement('script');
        script.src = `${url}&callback=${callbackName}`;
        script.onerror = (error) => {
        reject(error);
        delete (window as any)[callbackName];
        document.body.removeChild(script);
        };
    
        // 스크립트를 <head> 대신 <body>에 추가
        document.body.appendChild(script);
    });
    }
    
    async function doGeocoding(address: string) {
    const url =
        'http://api.vworld.kr/req/address?service=address' +
        '&request=getcoord' +
        '&address=' +
        encodeURI(address) +
        '&type=road' +
        '&key=133F4A0B-CF61-3981-8650-D3E32AF4353D';
    
    try {
        const result = await geocoding(url);
        console.log(result);
        useEffect(()=>{
        setXyArray((result as any).response.result.point);
        },[])
    } catch (error) {
        console.log(error);
    }
    }
    
    doGeocoding('서울시 성동구 아차산로7나길 18');

  return (
    <div className="content">
      <MenuDepth />
      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={isDraggable} onChange={draghandler}/>
        <label className="form-check-label">드래그on/off</label>
      </div>
      <ResponsiveReactGridLayout 
        className="layout"
        rowHeight={30}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 2 }}
        onLayoutChange={gridChange}
        isDraggable={isDraggable}
      >
        <div key="aaa" data-grid={{ i: "aaa", w: 6, h: 9, x: 0, y: 0, minW: 5, minH: 8 }}>
          <h3 className="h3-title">vworld api</h3>
          <div className="graph-cont">
            <Map xyArray={xyArray}>
                <div id="map" style={{ position: 'relative', width: '100%', height: '90%' }}></div>
            </Map>
          </div>
        </div>
        <div key="bbb" data-grid={{ i: "bbb", w: 6, h: 9, x: 0, y: 0, minW: 5, minH: 8 }}>
          <h3 className="h3-title">주소 검색</h3><br />
          {/* <div className="form-input"><input type="text" id="input-text" placeholder="Default" />
            <p className="message">Password is a required field</p>
            <button className="btn btn-sm btn-primary">검색</button>
          </div> */}
          <div className="btn-area right">
            <input type="text" defaultValue="" /><button className="btn btn-sm btn-primary">검색</button>
          </div>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default VworldExam;