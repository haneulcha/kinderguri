import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";
dotenv.config();

const CHILDHOUSE_URL = `https://openapi.gg.go.kr/ChildHouse`;

export class childHouseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = CHILDHOUSE_URL;
  }

  childHouseReducer(result) {
    return {
      name: result.KIDGARTN_NM,
      type: result.KIDGARTN_DIV_NM,
      tel: result.KIDGARTN_TELNO,
      location: {
        city: result.SIGUN_NM,
        district: result.SIGUN_NM,
        road: result.REFINE_ROADNM_ADDR,
        lot: result.REFINE_LOTNO_ADDR,
        lat: parseFloat(result.REFINE_WGS84_LAT),
        long: parseFloat(result.REFINE_WGS84_LOGT),
      },
      personnel: {
        staff: result.CHLDCARE_SCHLSTAF_CNT,
        kid: result.PSN_CAPA_CNT,
      },
      facility: {
        room: result.CHLDCR_ROOM_CNT,
        playground: result.PLAYGRND_CNT ? result.PLAYGRND_CNT : 0,
        cctv: result.CCTV_INSTL_CNT,
        shuttle: result.ATNDSKL_VEHCLE_OPERT_YN === "Y" ? true : false,
      },
      homepage: result.HMPG_ADDR ? result.HMPG_ADDR : "X",
      updated: result.DATA_STD_DE,
    };
  }

  async getAllChildhouses() {
    try {
      const { ChildHouse } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&SIGUN_NM=구리시`
      ).then((str) => JSON.parse(str));

      const [head, row] = ChildHouse;
      const rowArray = row.row;

      return Array.isArray(rowArray)
        ? rowArray.map((data) => this.childHouseReducer(data))
        : [];
    } catch (err) {
      console.error(err);
    }
  }
}
