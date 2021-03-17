import { gql } from "apollo-server-express";

const age0Kindergarten = gql`
  type Kindergarten {
    name: String!
    tel: String!
    address: String!
    lat: String!
    long: String!
  }
`;
