import styles from "../../styles/Main/MiniMap.module.css";
import MapLogo from "../../media/Main/MapLogo.svg";
import marker_logo from "../../media/Map/marker_logo.svg"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import { useState } from "react";

export default function MiniMap() {

    const GetData = () => {
        const [data, setData] = useState({});
        useEffect(() => {
           axios.get('/restaurants').then((res) => {
              const formattedData = res.data.data.map(restaurant => ({
                  id: restaurant.id,
                  location: {
                      lng: restaurant.location.longitude,
                      lat: restaurant.location.latitude
                  },
              }));
              setData(formattedData);
           })
        },[]);
  
        const item = Object.values(data).map((item) => (
           <MapMarker
              key= {item.id}
              clickable={true}
              position={item.location}
              image={{
                 src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                 size: { width: 24, height: 35 },
              }}
              title={item.title}
           />
        ));
        return item;
     }

    const MapTitle = () => {
        return(
            <div className={styles.title}>
                <img src={MapLogo}/>
                <span style={{
                    color: '#1C1C1C',
                    fontFamily: 'Noto Sans KR',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 'normal',
                    margin: '18.72, 0, 18.72, 0',
                    whiteSpace: 'nowrap'
                }}>학교지도</span>
                <Link to='/MapPage' style={{ 
                    textDecoration: "none",
                    marginTop: '10px',
                    marginLeft: '160px',
                    color: '#A1A1A1',
                    fontFamily: "Noto Sans KR",
                    fontSize: "10px"
                }}>
                자세히 보기
                </Link>
            </div>
        );
    }

    return(
        <>
            <MapTitle/>
            <Map
            center={{lat : 35.8361601, lng : 128.7528893}}
            style={{
                width: '348px',
                height: '296px',
                borderRadius: '20px',
                border: '1px solid #D9D9D9',
                marginLeft : '21px'
            }}
            level={3}
            >
                {GetData()}
            </Map>
        </>

    );

}