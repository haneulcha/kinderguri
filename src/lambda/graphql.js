import { ApolloServer } from "apollo-server-lambda";
// import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import {
  ageZeroKindergartenAPI,
  childHouseAPI,
  kindergartenAPI,
  hospitalAtNightAPI,
  barrierFreeTourAPI,
} from "../datasource/index.js";
import typeDefs from "./queries.js";

dotenv.config();

const resolvers = {
  Query: {
    age0Kindergartens: async (_, __, { dataSources }) =>
      await dataSources.AgeZeroKindergartenAPI.getAllAgeZeroKindergartens(),
    childHouses: async (_, __, { dataSources }) =>
      await dataSources.ChildHouseAPI.getAllChildhouses(),
    childHousesTypes: async (_, __, { dataSources }) =>
      await dataSources.ChildHouseAPI.getChildhousesTypes(),
    kindergartens: async (_, __, { dataSources }) =>
      await dataSources.KindergartenAPI.getAllKindergartens(),
    hospitalsAtNight: async (_, __, { dataSources }) =>
      await dataSources.HospitalsAtNightAPI.getAllHospitals(),
    barrierFreeTour: async (_, __, { dataSources }) =>
      await dataSources.BarrierFreeTourAPI.getAllTours(),
    barrierFreeTourInCity: async (_, { city }, { dataSources }) =>
      await dataSources.BarrierFreeTourAPI.getToursInCity({ city }),
    barrierFreeTourOptions: async (_, __, { dataSources }) =>
      await dataSources.BarrierFreeTourAPI.getAllCityList(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    AgeZeroKindergartenAPI: new ageZeroKindergartenAPI(),
    ChildHouseAPI: new childHouseAPI(),
    KindergartenAPI: new kindergartenAPI(),
    HospitalsAtNightAPI: new hospitalAtNightAPI(),
    BarrierFreeTourAPI: new barrierFreeTourAPI(),
  }),
});

exports.handler = server.createHandler();

// server.listen({ port: 4040 }).then(() => {
//   console.log(`
//       Server is running!
//       Listening on port 2000
//     `);
// });
