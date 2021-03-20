import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";
dotenv.config();

const HOSPITAL_AT_NIGHT_URL = `https://openapi.gg.go.kr/ChildNightTreatHosptl`;

export class hospitalAtNightAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = HOSPITAL_AT_NIGHT_URL;
  }

  hospitalReducer(result) {
    return {
      name: result.MEDCARE_FACLT_NM,
      type: result.INDUTYPE_NM,
      tel: result.MEDCARE_FACLT_TELNO,
      location: {
        city: result.SIGUN_NM,
        district: result.SIGUN_NM,
        road: result.REFINE_ROADNM_ADDR,
        lot: result.REFINE_LOTNO_ADDR,
        lat: result.REFINE_WGS84_LAT
          ? parseFloat(result.REFINE_WGS84_LAT)
          : null,
        long: result.REFINE_WGS84_LOGT
          ? parseFloat(result.REFINE_WGS84_LOGT)
          : null,
      },
      homepage: result.HMPG_ADDR ? result.HMPG_ADDR : "X",
    };
  }

  async getAllHospitals() {
    try {
      const { ChildNightTreatHosptl } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&pSize=200`
      ).then((str) => JSON.parse(str));

      const [head, row] = ChildNightTreatHosptl;
      const rowArray = row.row.filter(
        (item) => item.SIGUN_NM === "구리시" || item.SIGUN_NM === "남양주시"
      );

      return Array.isArray(rowArray)
        ? rowArray.map((data) => this.hospitalReducer(data))
        : [];
    } catch (err) {
      console.error(err);
    }
  }
}
