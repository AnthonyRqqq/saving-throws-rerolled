import { Outlet, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import Nav from "./components/Nav";

import './App.css'

const client = new ApolloClient({
  link: new HttpLink({ uri: "httpL//localhost:3001/graphql" }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // ApolloProvider wrapper enables access to ApolloClient from anywhere in program
    <ApolloProvider client={client}>
      <header className="header">
        <h3>
          <Nav />
        </h3>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </ApolloProvider>
  );
}

export default App;
