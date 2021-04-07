import { InMemoryCache, Reference, makeVar } from "@apollo/client";
import { getFromLS } from "./util";

interface CoordT {
  name: string;
  location: { long: number; lat: number };
}

interface HomeCoordT {
  lat?: number;
  long?: number;
}
export const coordVar = makeVar<CoordT[]>([]);
export const homeCoordVar = makeVar<HomeCoordT>(getFromLS("home"));

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        coord: {
          read() {
            return coordVar();
          },
        },
        homeCoord: {
          read() {
            return homeCoordVar();
          },
        },
      },
    },
  },
});
