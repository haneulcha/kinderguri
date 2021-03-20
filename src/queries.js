import { gql } from "apollo-server-express";

const query = gql`
  type Location {
    city: String!
    district: String!
    road: String
    lot: String
    lat: Float
    long: Float
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

  type Class {
    large: String
    middle: String
    small: String
  }

  type ImgUrl {
    original: String
    thumbnail: String
  }

  type Kindergarten {
    name: String!
    type: String!
    tel: String!
    location: Location!
    personnel: Personnel
    timeExt: Boolean
    homepage: String
    updated: String!
  }

  type ChildHouse {
    name: String!
    type: String!
    tel: String
    location: Location!
    personnel: Personnel
    facility: Facility!
    homepage: String
    updated: String!
  }

  type Hospital {
    name: String!
    type: String!
    tel: String
    location: Location!
    homepage: String
  }

  type Tour {
    name: String!
    tel: String
    type: String
    class: Class
    img: ImgUrl
    location: Location!
    updated: String
  }

  type Query {
    age0Kindergartens: [Kindergarten]!
    childHouses: [ChildHouse]!
    kindergartens: [Kindergarten]!
    hospitalsAtNight: [Hospital]!
    barrierFreeTour: [Tour]!
    barrierFreeTourOptions: [String]!
    barrierFreeTourInCity(city: String!): [Tour]!
  }
`;

export default query;
