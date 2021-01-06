import React from "react";

const filterByType = (fetched, type) => {
 
  return fetched.filter((item) => {
    return item.type === type
  })    
  
};

export const filterForChild = (fetched, type) => {  

  const onlyNeededInfo = fetched.reduce((acc, obj) => {
    const newObj = {
      institute: "어린이집",
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
  
  return filterByType(onlyNeededInfo, type)

}

export const filterForKinder = (fetched, type) => {

  const onlyNeededInfo = fetched.reduce((acc, obj) => {
        const newObj = {
          institute: "유치원",
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

  return filterByType(onlyNeededInfo, type)

}

