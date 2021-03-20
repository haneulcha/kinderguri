import { RESTDataSource } from "apollo-datasource-rest";
import dotenv from "dotenv";
dotenv.config();

const BARRIER_FREE_TOUR_URL = `https://openapi.gg.go.kr/NothgObstclTourInfo`;

export class barrierFreeTourAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BARRIER_FREE_TOUR_URL;
  }

  barrierFreeTourReducer(result) {
    return {
      name: result.CNTNTS_TITLE,
      type: result.TURSM_TYPE_CD_INFO,
      tel: result.TELNO_INFO ? result.TELNO_INFO : null,
      class: {
        large: result.LGCLAS_CD_NM,
        middle: result.MDCLASS_CD_NM,
        small: result.SMCLAS_CD_NM,
      },
      img: {
        original: result.ORGINL_REPRSNT_IMAGE_COURS,
        thumbnail: result.THUMB_REPRSNT_IMAGE_COURS,
      },
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
      updated: result.CNTNTS_UPD_TM,
    };
  }

  async getToursInCity({ city }) {
    const { NothgObstclTourInfo } = await this.get(
      `?KEY=${process.env.API_KEY}&Type=json&SIGUN_NM=${city}`
    ).then((str) => JSON.parse(str));

    const [head, row] = NothgObstclTourInfo;
    const rowArray = row.row;
    return Array.isArray(rowArray)
      ? rowArray.map((data) => this.barrierFreeTourReducer(data))
      : [];
  }

  async getAllCityList() {
    try {
      const { NothgObstclTourInfo } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&pSize=1000`
      ).then((str) => JSON.parse(str));

      const [head, row] = NothgObstclTourInfo;
      const array = row.row.map((item) => item.SIGUN_NM);
      const cityArray = new Set([...array]);

      return cityArray;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllTours() {
    try {
      const { NothgObstclTourInfo: guriInfo } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&SIGUN_NM=구리시`
      ).then((str) => JSON.parse(str));

      const { NothgObstclTourInfo: namyangjuInfo } = await this.get(
        `?KEY=${process.env.API_KEY}&Type=json&SIGUN_NM=남양주시`
      ).then((str) => JSON.parse(str));

      const [guriHead, guriRow] = guriInfo;
      const [nyjHead, nyjRow] = namyangjuInfo;

      const rowArray = guriRow.row.concat(nyjRow.row);

      return Array.isArray(rowArray)
        ? rowArray.map((data) => this.barrierFreeTourReducer(data))
        : [];
    } catch (err) {
      console.error(err);
    }
  }
}
