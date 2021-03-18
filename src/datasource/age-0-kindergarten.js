import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";
dotenv.config();

const AGE_ZERO_KINDERGARTEN_URL = `https://openapi.gg.go.kr/Age0PrvuuseKidgartn`;

export class ageZeroKindergartenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = AGE_ZERO_KINDERGARTEN_URL;
  }

  kindergartenReducer(result) {
    return {
      name: result.KIDGARTN_NM,
      tel: result.KIDGARTN_TELNO,
      location: {
        city: result.SIGUN_NM,
        district: result.ADMDONG_NM,
        road: result.REFINE_ROADNM_ADDR,
        lot: result.REFINE_LOTNO_ADDR,
        lat: parseFloat(result.REFINE_WGS84_LAT),
        long: parseFloat(result.REFINE_WGS84_LOGT),
      },
      personnel: {
        staff: result.CHLDCARE_SCHLSTAF_CNT,
        kid: result.CHILD_PSTPSN_CNT,
      },
      timeExt: result.TM_EXTS_TYPE_YN === "Y" ? true : false,
      updated: result.STD_YM,
    };
  }

  async getAllKindergartens() {
    try {
      const { Age0PrvuuseKidgartn } = await this.get(
        `?KEY=${process.env.API_KEY}&SIGUN_NM=구리시&TYPE=json`
      ).then((str) => JSON.parse(str));

      const [head, row] = Age0PrvuuseKidgartn;
      const rowArray = row.row;

      return Array.isArray(rowArray)
        ? rowArray.map((data) => this.kindergartenReducer(data))
        : [];
    } catch (err) {
      console.error(err);
    }
  }
}
