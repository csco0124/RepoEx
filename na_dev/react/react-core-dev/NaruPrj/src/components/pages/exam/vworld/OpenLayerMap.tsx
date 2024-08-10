import { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, get as getProjection, ProjectionLike } from 'ol/proj';

const OpenLayerMap = () => {
  const [mapObject, setMapObject] = useState({});

  useEffect(() => {
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        projection: getProjection('EPSG:3857') as ProjectionLike,
        center: fromLonLat([126.752, 37.4713], 'EPSG:3857'),
        zoom: 13
      })
    });

    setMapObject({ map });

    return () => {
      // Clean up code
      // This will be executed when the component is unmounted
      map.setTarget(undefined);
    };
  }, []);

  return <div id="map" style={{ height: '90%', width: '100%' }}></div>;
};

export default OpenLayerMap;