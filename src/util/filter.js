import React, { useEffect } from "react";

const Filter = ({ institute, type, places, setList, setMapMarking }) => {
  
  const filterArray = (arr) => {
    const filteredArray = arr.filter((item) => {
      return item.type === type;
    });
    setList(filteredArray);
  };

  const getAndRearray = () => {
    if (institute === "어린이집") {
      const arrayChild = places.reduce((acc, obj) => {
        const newObj = {
          name: obj.KIDGARTN_NM,
          type: obj.KIDGARTN_DIV_NM,
          tel: obj.KIDGARTN_TELNO,
          post: obj.REFINE_LOTNO_ADDR,
          road: obj.REFINE_ROADNM_ADDR,
          long: obj.REFINE_WGS84_LOGT,
          lat: obj.REFINE_WGS84_LAT,
          kids: obj.PSN_CAPA_CNT,
          staff: obj.CHLDCARE_SCHLSTAF_CNT,
          room: obj.CHLDCR_ROOM_CNT,
          car: obj.ATNDSKL_VEHCLE_OPERT_YN,
          cctv: obj.CCTV_INSTL_CNT,
          playground: obj.PLAYGRND_CNT,
        };
        acc.push(newObj);
        return acc;
      }, []);
      filterArray(arrayChild);
    } else if (institute === "유치원") {
      const arrayKinder = places.reduce((acc, obj) => {
        const newObj = {
          name: obj.FACLT_NM,
          type: obj.FOUND_DIV_NM,
          tel: obj.TELNO,
          post: obj.REFINE_LOTNO_ADDR,
          road: obj.REFINE_ROADNM_ADDR,
          long: obj.REFINE_WGS84_LOGT,
          lat: obj.REFINE_WGS84_LAT,
          homepage: obj.HMPG_ADDR,
        };
        acc.push(newObj);
        return acc;
      }, []);
      filterArray(arrayKinder);
    } else setList([]);
  };

  useEffect(() => {
    getAndRearray();
    setMapMarking();
  }, [places]); //props.places ?

  return null;
};
export default Filter;
