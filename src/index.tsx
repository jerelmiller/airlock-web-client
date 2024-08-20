import App from "./App";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri:
    import.meta.env.MODE !== "production"
      ? "http://localhost:4000"
      : process.env.VITE_APP_GQL_SERVER,
  // uri: 'https://rt-airlock-gateway-managed.herokuapp.com/'
});

import theme from "./theme.js";
import { ChakraProvider } from "@chakra-ui/react";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "web-client",
  version: "0.9",
});

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>
);
