import { RESTDataSource } from "apollo-datasource-rest";

const AGE_0_KINDERGARTEN_URL = `https://openapi.gg.go.kr/Age0PrvuuseKidgartn?KEY=${process.env.API_KEY}&TYPE=json`;

export class AgeZeroKindergartenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = AGE_0_KINDERGARTEN_URL;
  }

  async getAllKindergartens() {
    const response = await this.get();
    console.log("response", response);
  }

  getReducer(result) {
    return result;
  }
}
