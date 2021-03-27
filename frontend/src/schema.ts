import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Coord {
    name: string
    long: Float
    lat: Float
  }
  extend type Query {
    coord: [Coord]
  }
`;
