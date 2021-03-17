import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

import typeDefs from "./queries.js";
import { ageZeroKindergartenAPI } from "./datasource/age-0-kindergarten.js";

dotenv.config();

const resolvers = {
  Query: {
    age0Kindergartens: async (_, __, { dataSources }) =>
      await dataSources.AgeZeroKindergartenAPI.getAllKindergartens(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    AgeZeroKindergartenAPI: new ageZeroKindergartenAPI(),
  }),
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
});
