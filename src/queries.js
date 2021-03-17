import { gql } from "apollo-server-express";

const age0Kindergarten = gql`
  type Location {
    city: String!
    district: String!
    road: String!
    lot: Float!
    lat: String!
    long: String!
  }
  type Personnel {
    staff: Int
    kid: Int
  }
  type Kindergarten {
    name: String!
    tel: String
    location: Location!
    personnel: Personnel
    timeExt: Boolean
    update: String
  }

  type Query {
    age0Kindergartens: [Kindergarten]!
  }
`;

export default age0Kindergarten;
