import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { cache } from "./cache";
import { typeDefs } from "./schema";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./pages";
import { GlobalStyles } from "./styles";

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: "http://localhost:2000/graphql",
  typeDefs,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyles />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
