import { InMemoryCache, Reference, makeVar } from "@apollo/client";

interface Coord {
  name: string;
  long: number;
  lat: number;
}
export const coordVar = makeVar<Coord[]>([]);
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        coord: {
          read() {
            return coordVar();
          },
        },
      },
    },
  },
});
