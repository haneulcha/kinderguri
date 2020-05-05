/*global kakao*/
import React from "react";

class Map extends React.Component {
  componentDidUpdate() {
    const { list, markerId } = this.props;
    const script = document.createElement("script");
    const MAP_KEY = "9d8e11dbf4d776645435dbf7bd758bc3";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_KEY}&autoload=false`;

    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // displaying map
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.6027778, 127.1430889),
          level: 7,
        };
        const map = new kakao.maps.Map(container, options);

        // assign lat, long on positions
        let positions;

        if (markerId) {
          positions = [
            {
              content: "<div>" + list[markerId].name + "</div>",
              latlng: new kakao.maps.LatLng(
                list[markerId].lat,
                list[markerId].long
              ),
            },
          ];
        } else {
          positions = list.map((item) => {
            const newObj = {
              content: "<div>" + item.name + "</div>",
              latlng: new kakao.maps.LatLng(item.lat, item.long),
            };
            return newObj;
          });
        }

        // marker, info, event
        for (var i = 0; i < positions.length; i++) {
          var marker = new kakao.maps.Marker({
            map: map,
            position: positions[i].latlng,
          });

          var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content,
          });

          console.log(list, markerId);

          if (positions.length > 1) {
            kakao.maps.event.addListener(
              marker,
              "mouseover",
              makeOverListener(map, marker, infowindow)
            );
            kakao.maps.event.addListener(
              marker,
              "mouseout",
              makeOutListener(infowindow)
            );
          } else {
            marker.setMap(map);

            infowindow.open(map, marker);
          }
        }

        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }

        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }
      });
    };
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;
