import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

import typeDefs from "./queries.js";
import { ageZeroKindergartenAPI } from "./datasource/age-0-kindergarten.js";
import { childHouseAPI } from "./datasource/childhouse.js";
import { kindergartenAPI } from "./datasource/kindergarten.js";

dotenv.config();

const resolvers = {
  Query: {
    age0Kindergartens: async (_, __, { dataSources }) =>
      await dataSources.AgeZeroKindergartenAPI.getAllAgeZeroKindergartens(),
    childHouses: async (_, __, { dataSources }) =>
      await dataSources.ChildHouseAPI.getAllChildhouses(),
    kindergartens: async (_, __, { dataSources }) =>
      await dataSources.KindergartenAPI.getAllKindergartens(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    AgeZeroKindergartenAPI: new ageZeroKindergartenAPI(),
    ChildHouseAPI: new childHouseAPI(),
    KindergartenAPI: new kindergartenAPI(),
  }),
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
});
