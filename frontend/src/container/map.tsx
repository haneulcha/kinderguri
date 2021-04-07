/*global kakao*/
import React, { Fragment, useEffect, useState, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import dotenv from "dotenv";
import { setInLS } from "../util";
import { homeCoordVar } from "../cache";
dotenv.config();

declare global {
  interface Window {
    kakao: any;
  }
}

const GET_COORDS = gql`
  query GetCoords {
    coord @client
  }
`;

const GET_HOME = gql`
  query GetHome {
    homeCoord @client
  }
`;

interface MapProps extends RouteComponentProps {}

const Map: React.FC<MapProps> = () => {
  const { data, loading, error } = useQuery(GET_COORDS);
  const { data: myhome } = useQuery(GET_HOME);
  const [mapObj, setMapObj] = useState();
  const [overlayOn, setOverlayOn] = useState(false);
  const homeOverlay = useRef<any>();
  const homeMarker = useRef<any>();
  let markerList: any = [];
  let infoWindowList: any = [];

  function makeOverListener(map: any, marker: any, infowindow: any) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  function makeOutListener(infowindow: any) {
    return function () {
      infowindow.close();
    };
  }

  const askSetHomeHandler = (evt: any) => {
    const latlng = evt.latLng;
    let position = new window.kakao.maps.LatLng(
      latlng.getLat(),
      latlng.getLng()
    );

    var customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: `<div class="sethome-overlay"><p>집으로</p><p class="sethome">설정</p></div>`,
      xAnchor: 0.3,
      yAnchor: 0.91,
      clickable: true,
    });

    customOverlay.setMap(mapObj);
    console.log("customOverlay", customOverlay);
    setOverlayOn(true);
    homeOverlay.current = {
      customOverlay,
      lat: latlng.getLat(),
      long: latlng.getLng(),
    };
  };

  /* 오른쪽 클릭으로 집 설정 시 */
  useEffect(() => {
    if (overlayOn) {
      const setHome = (evt: any) => {
        console.log("집으로 설정");
        const { customOverlay, lat, long } = homeOverlay.current;
        setInLS("home", { lat, long });
        homeCoordVar({ lat, long });

        console.log("설정 완료");
        customOverlay.setMap(null);

        homeOverlay.current = undefined;
        setOverlayOn(false);
      };
      document.querySelector(".sethome")?.addEventListener("click", setHome);
    }
  }, [overlayOn]);

  /* 리스트에서 받은 좌표들 */
  useEffect(() => {
    if (!data.coord.length) return;

    function panTo(map: any, lat: any, lng: any) {
      var moveLatLon = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(moveLatLon);
    }

    // after clicking a list item
    if (data.coord.length === 1) {
      if (!data.coord[0].location.lat || !data.coord[0].location.long) return;

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          data.coord[0].location.lat,
          data.coord[0].location.long
        ),
      });

      const infoWindow = new window.kakao.maps.InfoWindow({
        position: new window.kakao.maps.LatLng(
          data.coord[0].location.lat,
          data.coord[0].location.long
        ),
        content: "<div class='onmap'>" + data.coord[0].name + "</div>",
      });

      marker.setMap(mapObj);
      infoWindow.open(mapObj, marker);
      panTo(mapObj, data.coord[0].location.lat, data.coord[0].location.long);

      markerList.push(marker);
      infoWindowList.push(infoWindow);
    } else {
      data.coord.map((item: any) => {
        const marker = new window.kakao.maps.Marker({
          map: mapObj,
          position: new window.kakao.maps.LatLng(
            item.location.lat,
            item.location.long
          ),
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          content: "<div class='onmap'>" + item.name + "</div>",
        });

        window.kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(mapObj, marker, infoWindow)
        );
        window.kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infoWindow)
        );

        markerList.push(marker);
      });
    }

    return () => {
      // eventlistener remove
      markerList.map((item: any) => {
        item.setMap(null);
      });
      markerList = [];
      if (infoWindowList.length) {
        infoWindowList.map((item: any) => item.close());
        infoWindowList = [];
      }
    };
  }, [data]);

  /* 마이홈 */
  useEffect(() => {
    if (mapObj && myhome) {
      if (homeMarker.current) {
        homeMarker.current.setMap(null);
      }
      const { lat, long } = myhome.homeCoord;
      var imageSrc = "../kinderguri-favicon.png", // 마커이미지의 주소입니다
        imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      var markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new window.kakao.maps.LatLng(lat, long);

      homeMarker.current = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      console.log("home", myhome);
      homeMarker.current.setMap(mapObj);
    }
  }, [mapObj, myhome]);

  /* 오른쪽 클릭 이벤트 등록 */
  useEffect(() => {
    if (mapObj) {
      window.kakao.maps.event.addListener(
        mapObj,
        "rightclick",
        askSetHomeHandler
      );

      return () => {
        window.kakao.maps.event.removeListener(
          mapObj,
          "rightclick",
          askSetHomeHandler
        );
      };
    }
  }, [mapObj]);

  /* 지도 초기화 */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_MAP_KEY_DEV}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new window.kakao.maps.LatLng(37.6027778, 127.143088),
          level: 6,
          draggable: true,
          scrollwheel: true,
          keyboardShortcuts: true,
        };
        const map = new window.kakao.maps.Map(container, options);

        setMapObj(map);
      });
    };
  }, []);

  if (loading) return <p>LOADING</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <div id="map" className="map"></div>
    </Fragment>
  );
};

export default Map;
