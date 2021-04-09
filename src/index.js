import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import path from "path";

import typeDefs from "./queries.js";
import { ageZeroKindergartenAPI } from "./datasource/age-0-kindergarten.js";
import { childHouseAPI } from "./datasource/childhouse.js";
import { kindergartenAPI } from "./datasource/kindergarten.js";
import { hospitalAtNightAPI } from "./datasource/hospital-at-night.js";
import { barrierFreeTourAPI } from "./datasource/barrier-free-tour.js";

dotenv.config();

(async function startApolloServer() {
  const __dirname = path.resolve();
  const app = express();

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

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

  server.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 2000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:2000${server.graphqlPath}`);
  return { server, app };
})();
