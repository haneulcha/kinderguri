import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";
dotenv.config();

const KINDERGARTEN_URL = `https://openapi.gg.go.kr/Kndrgrschoolstus`;

export class kindergartenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = KINDERGARTEN_URL;
  }

  kindergartenReducer(result) {
    return {
      name: result.FACLT_NM,
      type: result.FOUND_DIV_NM,
      tel: result.TELNO,
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
      updated: result.DATA_STD_DE,
    };
  }

  async getAllKindergartens() {
    try {
      const { Kndrgrschoolstus } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&SIGUN_NM=구리시`
      ).then((str) => JSON.parse(str));

      const [head, row] = Kndrgrschoolstus;
      const rowArray = row.row;

      return Array.isArray(rowArray)
        ? rowArray.map((data) => this.kindergartenReducer(data))
        : [];
    } catch (err) {
      console.error(err);
    }
  }
}
