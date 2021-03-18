import { gql } from "apollo-server-express";

const query = gql`
  type Location {
    city: String!
    district: String!
    road: String!
    lot: String!
    lat: Float!
    long: Float!
  }

  type Personnel {
    staff: Int
    kid: Int
  }

  type Facility {
    room: Int
    playground: Int
    cctv: Int
    shuttle: Boolean
  }

  type Kindergarten {
    name: String!
    tel: String
    location: Location!
    personnel: Personnel
    timeExt: Boolean
    updated: String!
  }

  type ChildHouse {
    name: String!
    type: String!
    tel: String
    location: Location!
    personnel: Personnel
    facility: Facility!
    hompage: String
    updated: String!
  }

  type Query {
    age0Kindergartens: [Kindergarten]!
    childHouses: [ChildHouse]!
  }
`;

export default query;
